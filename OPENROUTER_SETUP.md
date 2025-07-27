# OpenRouter Integration Setup

This project uses Ope## 5. Usage

### AI Chat
1. Click the AI chat button to open the side panel
2. Attach code files by dragging & dropping or clicking "Attach"
3. Ask questions about your code or request improvements
4. Use the generated code suggestions and insert them directly into your editor

### Code Suggestions
The code suggestion API works automatically with compatible editors and provides:
- Context-aware code completions
- Function and method suggestions
- Framework-specific patterns
- Error detection and fixes

## 6. Model Recommendations

### For Chat (Detailed Analysis)
- `anthropic/claude-3.5-sonnet` - Best for complex code review and analysis
- `openai/gpt-4o` - Excellent for detailed explanations and debugging

### For Code Suggestions (Speed & Efficiency)
- `openai/gpt-3.5-turbo` - Fast and cost-effective for basic completions
- `anthropic/claude-3-haiku` - Quick responses, good for real-time suggestions
- `meta-llama/llama-3.1-8b-instruct` - Good balance of speed and capability

## 7. Error Handlingfor AI chat functionality. Follow these steps to set up the integration:

## 1. Get OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up or log in to your account
3. Go to the [API Keys](https://openrouter.ai/keys) section
4. Create a new API key

## 2. Configure Environment Variables

Create a `.env.local` file in the root of your project and add:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
OPENROUTER_HTTP_REFERER=https://your-domain.com
OPENROUTER_X_TITLE=Web Coder AI Assistant
```

### Available Models

You can use any of these popular models:

- `anthropic/claude-3.5-sonnet` (recommended for coding tasks)
- `openai/gpt-4o`
- `openai/gpt-3.5-turbo`
- `meta-llama/llama-3.1-8b-instruct`
- `google/gemini-pro`

## 3. Features

The AI integration now supports:

### AI Chat Component
- **File Attachments**: Drag & drop or select code files
- **Code Analysis**: Get AI feedback on your code
- **Code Suggestions**: Receive actionable code improvements
- **Direct Code Insertion**: Insert AI-generated code directly into your editor
- **Context Awareness**: AI understands your attached files and conversation history

### Code Suggestions API
- **Real-time Code Completion**: Get intelligent code completions as you type
- **Context-Aware Suggestions**: AI understands your cursor position and surrounding code
- **Multi-language Support**: Works with JavaScript, TypeScript, Python, and more
- **Framework Detection**: Recognizes React, Vue, Angular, and other frameworks
- **Pattern Recognition**: Detects incomplete patterns and suggests completions

## 4. API Endpoints

- `/api/chat` - For AI chat conversations with file attachments
- `/api/code-suggestion` - For real-time code completion and suggestions

## 5. Usage

1. Click the AI chat button to open the side panel
2. Attach code files by dragging & dropping or clicking "Attach"
3. Ask questions about your code or request improvements
4. Use the generated code suggestions and insert them directly into your editor

## 5. Error Handling

If you see connection errors:

1. Verify your OpenRouter API key is correct
2. Check that you have sufficient credits in your OpenRouter account
3. Ensure your domain is properly configured if using HTTP_REFERER

## 6. Costs

OpenRouter charges based on the model and tokens used. Claude 3.5 Sonnet typically costs around $3 per million input tokens and $15 per million output tokens. Monitor your usage in the OpenRouter dashboard.
