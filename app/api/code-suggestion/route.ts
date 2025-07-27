import { type NextRequest, NextResponse } from "next/server"

interface CodeSuggestionRequest {
  fileContent: string
  cursorLine: number
  cursorColumn: number
  suggestionType: string
  fileName?: string
}

interface CodeContext {
  language: string
  framework: string
  beforeContext: string
  currentLine: string
  afterContext: string
  cursorPosition: { line: number; column: number }
  isInFunction: boolean
  isInClass: boolean
  isAfterComment: boolean
  incompletePatterns: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body: CodeSuggestionRequest = await request.json()
    const { fileContent, cursorLine, cursorColumn, suggestionType, fileName } = body

    // Validate input
    if (!fileContent || cursorLine < 0 || cursorColumn < 0 || !suggestionType) {
      return NextResponse.json({ error: "Invalid input parameters" }, { status: 400 })
    }

    // Analyze code context
    const context = analyzeCodeContext(fileContent, cursorLine, cursorColumn, fileName)

    // Build AI prompt
    const prompt = buildPrompt(context, suggestionType)

    // Call AI service
    const suggestion = await generateSuggestion(prompt)

    return NextResponse.json({
      suggestion,
      context,
      metadata: {
        language: context.language,
        framework: context.framework,
        position: context.cursorPosition,
        generatedAt: new Date().toISOString(),
        model: process.env.OPENROUTER_MODEL || 'AI Assistant',
        suggestionType,
      },
    })
  } catch (error: any) {
    console.error("Context analysis error:", error)
    
    // Check if it's an OpenRouter configuration issue
    if (error.message?.includes('OpenRouter API key not configured')) {
      return NextResponse.json(
        { 
          error: "OpenRouter API key not configured", 
          message: "Please set OPENROUTER_API_KEY in your environment variables. Check OPENROUTER_SETUP.md for details.",
          suggestion: "// OpenRouter API key required for code suggestions"
        }, 
        { status: 500 }
      )
    }

    if (error.message?.includes('AI service error')) {
      return NextResponse.json(
        { 
          error: "AI service unavailable", 
          message: "OpenRouter API is currently unavailable. Please try again later.",
          suggestion: "// AI service temporarily unavailable"
        }, 
        { status: 503 }
      )
    }

    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: error.message || "An unexpected error occurred",
        suggestion: "// Error generating suggestion"
      }, 
      { status: 500 }
    )
  }
}

/**
 * Analyze the code context around the cursor position
 */
function analyzeCodeContext(content: string, line: number, column: number, fileName?: string): CodeContext {
  const lines = content.split("\n")
  const currentLine = lines[line] || ""

  // Get surrounding context (10 lines before and after)
  const contextRadius = 10
  const startLine = Math.max(0, line - contextRadius)
  const endLine = Math.min(lines.length, line + contextRadius)

  const beforeContext = lines.slice(startLine, line).join("\n")
  const afterContext = lines.slice(line + 1, endLine).join("\n")

  // Detect language and framework
  const language = detectLanguage(content, fileName)
  const framework = detectFramework(content)

  // Analyze code patterns
  const isInFunction = detectInFunction(lines, line)
  const isInClass = detectInClass(lines, line)
  const isAfterComment = detectAfterComment(currentLine, column)
  const incompletePatterns = detectIncompletePatterns(currentLine, column)

  return {
    language,
    framework,
    beforeContext,
    currentLine,
    afterContext,
    cursorPosition: { line, column },
    isInFunction,
    isInClass,
    isAfterComment,
    incompletePatterns,
  }
}

/**
 * Build AI prompt based on context
 */
function buildPrompt(context: CodeContext, suggestionType: string): string {
  const contextInfo = [
    `Language: ${context.language}`,
    `Framework: ${context.framework}`,
    `Suggestion Type: ${suggestionType}`,
    `Position: Line ${context.cursorPosition.line}, Column ${context.cursorPosition.column}`,
  ].join('\n')

  const codeAnalysis = [
    `In Function: ${context.isInFunction}`,
    `In Class: ${context.isInClass}`,
    `After Comment: ${context.isAfterComment}`,
    `Incomplete Patterns: ${context.incompletePatterns.join(", ") || "None"}`,
  ].join('\n')

  return `${contextInfo}

Code Context:
\`\`\`${context.language.toLowerCase()}
${context.beforeContext}
${context.currentLine.substring(0, context.cursorPosition.column)}|CURSOR|${context.currentLine.substring(context.cursorPosition.column)}
${context.afterContext}
\`\`\`

Analysis:
${codeAnalysis}

Please provide a ${suggestionType} code completion that fits naturally at the cursor position. Consider the surrounding code context and maintain consistency with the existing code style and patterns.`
}

/**
 * Generate suggestion using OpenRouter AI service
 */
async function generateSuggestion(prompt: string): Promise<string> {
  try {
    const openRouterApiKey = process.env.OPENROUTER_API_KEY
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key not configured')
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'https://localhost:3000',
        'X-Title': process.env.OPENROUTER_X_TITLE || 'Web Coder AI Assistant',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `You are an expert code completion assistant. You provide precise, contextually appropriate code suggestions.

Rules:
1. Return ONLY the code that should be inserted at the cursor position
2. Do NOT include explanations, comments, or markdown formatting
3. Maintain proper indentation and code style
4. Follow language-specific best practices
5. Make suggestions that fit naturally in the existing code context
6. If completing a function, provide the complete implementation
7. If completing a line, provide only what's needed to complete it`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent code suggestions
        max_tokens: 500,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API error:', errorData)
      throw new Error(`AI service error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from AI service')
    }

    let suggestion = data.choices[0].message.content

    // Clean up the suggestion
    if (suggestion.includes("```")) {
      const codeMatch = suggestion.match(/```[\w]*\n?([\s\S]*?)```/)
      suggestion = codeMatch ? codeMatch[1].trim() : suggestion
    }

    // Remove cursor markers if present
    suggestion = suggestion.replace(/\|CURSOR\|/g, "").trim()

    // Remove any leading/trailing explanatory text
    const lines = suggestion.split('\n')
    const codeLines = lines.filter((line: string) => 
      !line.startsWith('//') || 
      !line.startsWith('#') || 
      !line.toLowerCase().includes('here') ||
      !line.toLowerCase().includes('suggestion')
    )

    return codeLines.join('\n').trim() || suggestion
  } catch (error) {
    console.error("AI generation error:", error)
    return "// AI suggestion unavailable"
  }
}

// Helper functions for code analysis
function detectLanguage(content: string, fileName?: string): string {
  if (fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase()
    const extMap: Record<string, string> = {
      ts: "TypeScript",
      tsx: "TypeScript",
      js: "JavaScript",
      jsx: "JavaScript",
      py: "Python",
      java: "Java",
      go: "Go",
      rs: "Rust",
      php: "PHP",
    }
    if (ext && extMap[ext]) return extMap[ext]
  }

  // Content-based detection
  if (content.includes("interface ") || content.includes(": string")) return "TypeScript"
  if (content.includes("def ") || content.includes("import ")) return "Python"
  if (content.includes("func ") || content.includes("package ")) return "Go"

  return "JavaScript"
}

function detectFramework(content: string): string {
  if (content.includes("import React") || content.includes("useState")) return "React"
  if (content.includes("import Vue") || content.includes("<template>")) return "Vue"
  if (content.includes("@angular/") || content.includes("@Component")) return "Angular"
  if (content.includes("next/") || content.includes("getServerSideProps")) return "Next.js"

  return "None"
}

function detectInFunction(lines: string[], currentLine: number): boolean {
  for (let i = currentLine - 1; i >= 0; i--) {
    const line = lines[i]
    if (line?.match(/^\s*(function|def|const\s+\w+\s*=|let\s+\w+\s*=)/)) return true
    if (line?.match(/^\s*}/)) break
  }
  return false
}

function detectInClass(lines: string[], currentLine: number): boolean {
  for (let i = currentLine - 1; i >= 0; i--) {
    const line = lines[i]
    if (line?.match(/^\s*(class|interface)\s+/)) return true
  }
  return false
}

function detectAfterComment(line: string, column: number): boolean {
  const beforeCursor = line.substring(0, column)
  return /\/\/.*$/.test(beforeCursor) || /#.*$/.test(beforeCursor)
}

function detectIncompletePatterns(line: string, column: number): string[] {
  const beforeCursor = line.substring(0, column)
  const patterns: string[] = []

  if (/^\s*(if|while|for)\s*\($/.test(beforeCursor.trim())) patterns.push("conditional")
  if (/^\s*(function|def)\s*$/.test(beforeCursor.trim())) patterns.push("function")
  if (/\{\s*$/.test(beforeCursor)) patterns.push("object")
  if (/\[\s*$/.test(beforeCursor)) patterns.push("array")
  if (/=\s*$/.test(beforeCursor)) patterns.push("assignment")
  if (/\.\s*$/.test(beforeCursor)) patterns.push("method-call")

  return patterns
}

function getLastNonEmptyLine(lines: string[], currentLine: number): string {
  for (let i = currentLine - 1; i >= 0; i--) {
    const line = lines[i]
    if (line.trim() !== "") return line
  }
  return ""
}