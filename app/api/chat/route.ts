import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY
    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' }, 
        { status: 500 }
      )
    }

    // Prepare messages for OpenRouter
    const messages = [
      {
        role: 'system',
        content: `You are an expert AI coding assistant. You help developers with code review, debugging, optimization, and best practices. 
        
When analyzing code:
- Provide specific, actionable feedback
- Suggest improvements with explanations
- Point out potential bugs or issues
- Recommend best practices
- Consider performance implications
- Suggest appropriate error handling

When generating code:
- Write clean, readable, and well-documented code
- Follow language-specific conventions
- Include proper error handling
- Consider edge cases
- Optimize for maintainability

Always be helpful, clear, and concise in your responses.`
      }
    ]

    // Add conversation history
    if (history && Array.isArray(history)) {
      messages.push(...history.slice(-10)) // Keep last 10 messages for context
    }

    // Add current message
    messages.push({ role: 'user', content: message })

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
        messages,
        temperature: 0.7,
        max_tokens: 4000,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API error:', errorData)
      
      return NextResponse.json(
        { error: 'Failed to get response from AI service' }, 
        { status: response.status }
      )
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data)
      return NextResponse.json(
        { error: 'Invalid response from AI service' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({
      response: data.choices[0].message.content,
      tokens: data.usage?.total_tokens || 0,
      model: data.model || process.env.OPENROUTER_MODEL || 'AI Assistant'
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
