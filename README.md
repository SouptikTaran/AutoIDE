# Web Coder

<div align="center">
  <h3>🚀 Advanced Cloud-Based IDE with AI-Powered Development</h3>
  <p>A modern, browser-based integrated development environment built with Next.js, featuring AI-assisted coding, real-time collaboration, and instant deployment capabilities.</p>

  ![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
  ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
  ![WebContainer](https://img.shields.io/badge/WebContainer-Enabled-orange?style=flat-square)
  ![AI Powered](https://img.shields.io/badge/AI-Powered-green?style=flat-square)
</div>

## 🌟 Key Features

### 🤖 AI-Powered Development
- **Intelligent Code Suggestions**: Context-aware completions powered by OpenRouter API
- **Real-time Code Analysis**: Smart error detection and optimization recommendations
- **AI Chat Assistant**: Interactive code review and debugging support
- **Multi-Model Support**: Integration with Claude, GPT-4, and Llama models

### 💻 Professional Code Editor
- **Monaco Editor Integration**: Full-featured VS Code editor experience
- **Syntax Highlighting**: Support for 20+ programming languages
- **Advanced IntelliSense**: TypeScript/JavaScript autocompletion and error checking
- **Custom Themes**: Dark/light modes with syntax-specific highlighting
- **Multi-file Management**: Tabbed interface with unsaved changes tracking

### 🌐 WebContainer Technology
- **Instant Environment Setup**: Run Node.js applications directly in the browser
- **Real-time Preview**: Live development server with hot reloading
- **Package Management**: NPM package installation and dependency management
- **Terminal Integration**: Full-featured terminal with command execution

### � GitHub Integration
- **Repository Import**: Direct import of GitHub repositories into the editor
- **Automatic Structure Detection**: Smart recognition of project frameworks and languages  
- **Branch Selection**: Choose specific branches to import
- **File Tree Generation**: Complete project structure recreation
- **Metadata Preservation**: Maintain repository information and descriptions

### 🗂️ Advanced File Management
- **Interactive File Explorer**: Intuitive tree-view with file operations
- **Drag & Drop Support**: Easy file organization and management
- **Git Integration**: Version control with branch management (planned)
- **Project Templates**: 25+ pre-configured starter templates

### � Modern UI/UX
- **Responsive Design**: Optimized for desktop and mobile devices
- **Component Library**: Built with Radix UI and Tailwind CSS
- **Accessibility First**: WCAG 2.1 compliant interface
- **Customizable Workspace**: Resizable panels and configurable layouts

### Core Technologies
- **Framework**: Next.js 15.4.4 with App Router
- **Runtime**: React 19.1.0 with TypeScript 5.x
- **Styling**: Tailwind CSS 4.x with custom design system
- **Authentication**: NextAuth.js with multi-provider support
- **Database**: Prisma ORM with PostgreSQL
- **State Management**: Zustand for client-side state

### AI Integration
- **API Provider**: OpenRouter for multi-model AI access
- **Supported Models**: 
  - Anthropic Claude 3.5 Sonnet
  - OpenAI GPT-4/GPT-3.5 Turbo
  - Meta Llama 3.1
- **Features**: Code completion, chat assistance, error analysis

### Development Environment
- **Code Execution**: WebContainer API for sandboxed runtime
- **Editor**: Monaco Editor with custom configuration
- **Terminal**: Xterm.js with full shell capabilities
- **File System**: Virtual file system with real-time synchronization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- OpenRouter API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SouptikTaran/AutoIDE.git
   cd web-coder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # GitHub OAuth (Required for repository import)
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   
   # OpenRouter AI Integration
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
   OPENROUTER_HTTP_REFERER=https://your-domain.com
   OPENROUTER_X_TITLE=Web Coder AI Assistant
   
   # Database (Optional)
   DATABASE_URL=your_postgresql_connection_string
   
   # Authentication (Optional)
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage Guide

### Importing GitHub Repositories
1. **Sign in with GitHub**: Authenticate using your GitHub account
2. **Access Import**: Click "Open GitHub Repository" on the dashboard
3. **Browse Repositories**: Search and filter your repositories
4. **Select Repository**: Choose the repository and branch to import
5. **Automatic Import**: The system will:
   - Fetch all repository files
   - Detect the project framework/language
   - Create appropriate folder structure
   - Set up the development environment
6. **Start Coding**: Begin editing in the fully-featured IDE

### Creating a New Playground
1. Navigate to the dashboard
2. Click "Create New Playground"
3. Select from 25+ available templates:
   - React/Next.js applications
   - Vue.js/Nuxt.js projects
   - Node.js/Express servers
   - Static HTML/CSS/JS sites
   - Framework-specific starters

### Using AI Features
1. **Code Suggestions**: Enable AI assistance in editor settings
2. **Chat Assistant**: Use the AI panel for code review and debugging
3. **Error Analysis**: Hover over errors for AI-powered fixes
4. **Code Optimization**: Request improvements for selected code blocks

### File Management
- **Create Files**: Right-click in explorer → New File
- **Organize Projects**: Drag and drop files/folders
- **Search Code**: Use Cmd/Ctrl + F for in-file search
- **Multi-tab Editing**: Switch between open files seamlessly

### Running Applications
1. **Install Dependencies**: Automatic npm install on project load
2. **Start Development Server**: Click "Run" to launch preview
3. **View Output**: Monitor build process in integrated terminal
4. **Live Preview**: See changes in real-time preview panel

## 🛠️ Development

### Project Structure
```
web-coder/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (root)/            # Public pages
│   ├── api/               # API endpoints
│   ├── dashboard/         # Dashboard interface
│   └── playground/        # IDE interface
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── modal/            # Modal components
├── features/             # Feature-specific modules
│   ├── ai-chat/          # AI assistant functionality
│   ├── auth/             # Authentication logic
│   ├── playground/       # IDE core features
│   └── webContainers/    # Runtime environment
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── prisma/              # Database schema
└── vibecode-starters/   # Project templates
```

### Available Scripts
```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint checks

# Database (if using Prisma)
npx prisma migrate dev    # Run database migrations
npx prisma studio        # Open database browser
```

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🔧 Configuration

### Monaco Editor Settings
The editor supports extensive customization:
- **Themes**: Custom dark/light themes with syntax highlighting
- **Languages**: Auto-detection for 20+ programming languages
- **Features**: IntelliSense, error squiggles, code folding
- **Keybindings**: VS Code-compatible shortcuts

### AI Model Configuration
Optimize AI performance by selecting appropriate models:
- **Chat**: Claude 3.5 Sonnet for detailed analysis
- **Code Completion**: GPT-3.5 Turbo for speed
- **Error Fixing**: GPT-4 for complex debugging

### WebContainer Limitations
- **Node.js Runtime**: Limited to browser-compatible packages
- **File System**: Virtual file system with persistence
- **Network**: Restricted external API access
- **Performance**: Dependent on browser capabilities

## 📦 Dependencies

### Core Framework
- **Next.js 15.4.4**: React framework with App Router
- **React 19.1.0**: UI library with latest features
- **TypeScript 5.x**: Static type checking

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS 4.x**: Utility-first styling
- **Lucide React**: Modern icon library
- **Monaco Editor**: Code editor component

### Development Tools
- **WebContainer API**: Browser-based runtime
- **Xterm.js**: Terminal emulator
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication framework

## 🔒 Security

### Data Protection
- **Client-side Execution**: Code runs in sandboxed WebContainer
- **API Key Security**: Server-side proxy for AI requests
- **User Authentication**: Secure session management
- **Data Encryption**: HTTPS-only communication

### Privacy Considerations
- **Code Privacy**: Projects stored locally in browser
- **AI Processing**: Code sent to AI providers for analysis
- **User Data**: Minimal data collection and storage

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Docker Deployment
```bash
# Build image
docker build -t web-coder .

# Run container
docker run -p 3000:3000 web-coder
```

### Manual Deployment
```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

## 📈 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Aggressive caching strategies

### Browser Requirements
- **Chrome/Edge**: 90+ (recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **WebContainer Support**: Required for runtime features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Follow the Quick Start guide
2. Install development dependencies
3. Run tests: `npm test`
4. Submit PR with tests and documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor**: Microsoft's excellent code editor
- **WebContainer**: StackBlitz's revolutionary browser runtime
- **Radix UI**: Outstanding accessible component library
- **Vercel**: Exceptional deployment platform
- **OpenRouter**: Unified AI model access

---

<div align="center">
  <p>Built with ❤️ by the Web Coder team</p>
  <p>
    <a href="https://github.com/SouptikTaran/AutoIDE">Repository</a> •
    <a href="https://web-coder.vercel.app">Live Demo</a> •
    <a href="mailto:support@webcoder.dev">Support</a>
  </p>
</div>
