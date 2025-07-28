# Contributing to Web Coder 🤝

<div align="center">
  <h2>Welcome Contributors! 🎉</h2>
  <p>We're excited to have you contribute to Web Coder - the future of browser-based development!</p>
  
  ![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)
  ![Open Source](https://img.shields.io/badge/Open_Source-MIT-blue?style=for-the-badge)
  ![Good First Issues](https://img.shields.io/badge/Good_First_Issues-Available-orange?style=for-the-badge)
</div>

---

## 🌟 Why Contribute?

- **Learn Cutting-Edge Tech**: Work with React 19, Next.js 15, WebContainer, and AI APIs
- **Make Real Impact**: Your code will help developers worldwide
- **Build Your Portfolio**: Contribute to a modern, production-ready application
- **Join Our Community**: Connect with passionate developers
- **Gain Recognition**: Contributors get featured and credited

---

## 🚀 Quick Start for Contributors

### 1. **Fork & Clone**
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/SouptikTaran/AutoIDE.git
cd AutoIDE
```

### 2. **Setup Development Environment**
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Setup your environment variables (see .env.example for details)
```

### 3. **Run the Project**
```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### 4. **Make Your First Contribution**
```bash
# Create a new branch
git checkout -b feature/your-awesome-feature

# Make your changes
# Commit and push
git add .
git commit -m "feat: add your awesome feature"
git push origin feature/your-awesome-feature

# Create a Pull Request on GitHub
```

---

## 🎯 Ways to Contribute

### 🐛 **Bug Reports**
Found a bug? Help us fix it!
- Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- Check [existing issues](https://github.com/SouptikTaran/AutoIDE/issues) first
- Provide detailed reproduction steps
- Include screenshots/videos if helpful

### 💡 **Feature Requests**
Have a great idea? We'd love to hear it!
- Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem you're solving
- Describe your proposed solution
- Consider the impact on existing users

### 📚 **Documentation**
Help improve our docs!
- Fix typos and grammar
- Add examples and clarifications
- Create tutorials and guides
- Improve API documentation

### 🎨 **UI/UX Improvements**
Make Web Coder more beautiful and user-friendly!
- Enhance existing components
- Improve accessibility
- Add animations and interactions
- Optimize for mobile devices

### 🔧 **Code Contributions**
Ready to dive into the code? Here are some areas:
- New IDE features
- AI integration improvements
- Performance optimizations
- WebContainer enhancements
- Testing and automation

---

## 🏷️ Good First Issues

Perfect for newcomers! Look for issues labeled:

- ![Good First Issue](https://img.shields.io/badge/-good%20first%20issue-7057ff) - Beginner-friendly
- ![Help Wanted](https://img.shields.io/badge/-help%20wanted-008672) - We need your help
- ![Documentation](https://img.shields.io/badge/-documentation-0075ca) - Improve docs
- ![UI/UX](https://img.shields.io/badge/-ui%2Fux-d73a4a) - Design improvements

**[👀 Browse Good First Issues](https://github.com/SouptikTaran/AutoIDE/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)**

---

## 📋 Development Guidelines

### **Code Style**
We use automated tools to maintain consistency:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type checking
npm run type-check

# Run all checks
npm run check-all
```

### **TypeScript Standards**
```typescript
// ✅ Good: Use proper interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// ✅ Good: Use async/await
const fetchUser = async (id: string): Promise<UserProfile> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// ❌ Avoid: Using 'any' type
const userData: any = await fetchUser(id);

// ✅ Good: Proper error handling
try {
  const user = await fetchUser(id);
  return user;
} catch (error) {
  console.error('Failed to fetch user:', error);
  throw new Error('User fetch failed');
}
```

### **React Component Guidelines**
```typescript
// ✅ Good: Functional components with TypeScript
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children,
  variant = 'primary'
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};

// ✅ Good: Use custom hooks for logic
const useUserData = (userId: string) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading };
};
```

### **Testing Standards**
We aim for comprehensive test coverage:

```typescript
// Unit tests for components
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// API tests
import { createMocks } from 'node-mocks-http';
import handler from '../api/users';

describe('/api/users', () => {
  it('returns user data', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' }
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
```

---

## 🔄 Pull Request Process

### **Before Submitting**
- [ ] Fork and create a feature branch
- [ ] Write clear, concise commit messages
- [ ] Add tests for new functionality
- [ ] Update documentation if needed
- [ ] Run `npm run check-all` to ensure quality
- [ ] Test your changes locally

### **PR Title Format**
Use conventional commits for clear history:
```
feat: add AI chat history feature
fix: resolve WebContainer memory leak
docs: update API documentation
style: improve button component styling
refactor: optimize file tree rendering
test: add playground creation tests
```

### **PR Description Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Added integration tests

## Screenshots (if applicable)
Add screenshots or GIFs showing the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### **Review Process**
1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Get approval from maintainers
5. **Merge**: Your contribution is merged! 🎉

---

## 🏗️ Project Structure

Understanding our codebase:

```
web-coder/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Public pages  
│   ├── api/               # API endpoints
│   ├── dashboard/         # Dashboard interface
│   └── playground/        # IDE interface
├── components/            # Reusable UI components
│   ├── ui/               # Base components (Radix UI)
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

### **Key Areas to Contribute**

#### 🤖 **AI Features** (`features/ai-chat/`)
- Improve code suggestions
- Add new AI model integrations
- Enhance chat interface
- Optimize AI response times

#### 🎨 **Editor Experience** (`features/playground/`)
- Monaco Editor enhancements
- New language support
- Theme improvements
- Keyboard shortcuts

#### 🔗 **GitHub Integration** (`features/dashboard/`)
- Repository management
- Branch switching
- Commit operations
- Pull request features

#### ⚡ **WebContainer Runtime** (`features/webContainers/`)
- Performance optimizations
- Package management
- Terminal improvements
- File system operations

---

## 🌐 Community & Communication

### **Stay Connected**
- 💬 **GitHub Discussions**: [Ask questions and share ideas](https://github.com/SouptikTaran/AutoIDE/discussions)
- 🐛 **Issues**: [Report bugs and request features](https://github.com/SouptikTaran/AutoIDE/issues)
- 📧 **Email**: contribute@webcoder.dev
- 🐦 **Twitter**: [@WebCoderIDE](https://twitter.com/WebCoderIDE) (updates and announcements)

### **Discussion Categories**
- **💡 Ideas**: Share feature suggestions
- **❓ Q&A**: Get help with development
- **🎉 Show and Tell**: Share your contributions
- **📢 Announcements**: Important updates

### **Response Times**
- **Issues**: We aim to respond within 48 hours
- **Pull Requests**: Initial review within 72 hours
- **Discussions**: Community-driven, usually same day

---

### **Special Recognition**
- **First-time Contributors**: Special welcome and guidance
- **Top Monthly Contributors**: Featured in monthly highlights
- **Bug Hunters**: Recognition for finding critical issues
- **Documentation Heroes**: Special thanks for improving docs

---

## 📚 Resources for Contributors

### **Learning Resources**
- **Next.js**: [Official Documentation](https://nextjs.org/docs)
- **React**: [React Documentation](https://react.dev)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs)
- **WebContainer**: [StackBlitz WebContainer Docs](https://webcontainer.io/guides)
- **Prisma**: [Prisma Documentation](https://www.prisma.io/docs)

### **Development Tools**
- **VS Code**: Recommended editor with extensions
- **GitHub CLI**: For easier repository management
- **Postman**: For API testing
- **React DevTools**: For debugging React components

### **Useful Commands**
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run type-check      # TypeScript type checking
npm run test            # Run test suite
npm run test:watch      # Run tests in watch mode

# Database
npx prisma studio       # Open database browser
npx prisma migrate dev  # Run database migrations
npx prisma generate     # Generate Prisma client

# Maintenance
npm run clean           # Clean build artifacts
npm run fresh-install   # Clean install dependencies
```

---

## ❓ FAQ for Contributors

### **Q: I'm new to open source. Where should I start?**
A: Start with [Good First Issues](https://github.com/SouptikTaran/AutoIDE/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) and read our documentation. Don't hesitate to ask questions!

### **Q: How do I set up the AI features for development?**
A: You'll need an OpenRouter API key. See our [setup guide](README.md#environment-configuration) for details.

### **Q: Can I work on multiple issues at once?**
A: We recommend focusing on one issue at a time, especially for beginners. This ensures quality and prevents conflicts.

### **Q: How do I test WebContainer features locally?**
A: WebContainer works in modern browsers. Use Chrome/Edge for best compatibility during development.

### **Q: What if my PR needs changes?**
A: No problem! We'll provide constructive feedback. Address the comments and push new commits to your branch.

### **Q: Can I contribute if I'm not a developer?**
A: Absolutely! We need help with documentation, design, testing, and community management.

---

## 🔒 Security & Responsible Disclosure

### **Security Issues**
If you find a security vulnerability:
1. **DO NOT** create a public issue
2. Email mr.souptiktaran@gmail.com with details
3. We'll respond within 24 hours
4. We'll credit you once the issue is resolved

### **What We Consider Security Issues**
- Authentication bypasses
- Data exposure vulnerabilities  
- XSS or injection attacks
- Unauthorized access to user data
- API security flaws

---

## 📄 Legal & Licensing

### **Contributor License Agreement**
By contributing, you agree that:
- Your contributions are original work
- You grant us rights to use your contributions
- Your contributions are licensed under our [MIT License](LICENSE)

### **Code of Conduct**
We follow a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment:
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on collaboration over competition

---

## 🎉 Getting Started Checklist

Ready to contribute? Here's your checklist:

- [ ] ⭐ Star the repository
- [ ] 🍴 Fork the repository  
- [ ] 📋 Read this contributing guide
- [ ] 🛠️ Set up your development environment
- [ ] 🔍 Browse [Good First Issues](https://github.com/SouptikTaran/AutoIDE/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [ ] 💬 Join our [GitHub Discussions](https://github.com/SouptikTaran/AutoIDE/discussions)
- [ ] 🌟 Make your first contribution!

---

<div align="center">

## 🚀 Ready to Build the Future of Development?

**Your contributions make Web Coder better for developers worldwide!**

[🎯 Find an Issue](https://github.com/SouptikTaran/AutoIDE/issues) | [💬 Ask Questions](https://github.com/SouptikTaran/AutoIDE/discussions) | [📖 Read Docs](README.md)

### **Thank you for contributing to Web Coder! 🙏**

</div>
