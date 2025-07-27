# GitHub Integration Setup Guide

This guide will help you set up GitHub OAuth integration to enable repository import functionality in Web Coder.

## 1. Create GitHub OAuth App

### Step 1: Navigate to GitHub Developer Settings
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**

### Step 2: Configure OAuth Application
Fill in the following information:

**Application name**: `Web Coder IDE` (or your preferred name)

**Homepage URL**: 
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

**Application description**: `Cloud-based IDE with AI-powered development capabilities`

**Authorization callback URL**:
- Development: `http://localhost:3000/api/auth/callback/github`
- Production: `https://your-domain.com/api/auth/callback/github`

### Step 3: Get OAuth Credentials
After creating the app:
1. Copy the **Client ID**
2. Generate a new **Client Secret** and copy it
3. Keep these secure - you'll need them for environment variables

## 2. Configure Environment Variables

Add these to your `.env.local` file:

```env
# GitHub OAuth Configuration
GITHUB_ID=your_github_client_id_here
GITHUB_SECRET=your_github_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### Generating NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## 3. GitHub Permissions

The OAuth app will request these permissions:
- **`read:user`**: Read user profile information
- **`user:email`**: Read user email addresses
- **`repo`**: Access to public and private repositories

## 4. Supported Repository Features

### Import Capabilities
- ✅ Public repositories
- ✅ Private repositories (with proper access)
- ✅ Organization repositories (with member access)
- ✅ Files up to 1MB each
- ✅ Text files only (binary files get placeholder)

### Framework Detection
The system automatically detects:
- **React/Next.js**: `next.config.js`, `package.json` with React
- **Vue/Nuxt**: `nuxt.config.js`, `vue.config.js`
- **Angular**: `angular.json`
- **Svelte/SvelteKit**: `svelte.config.js`
- **Astro**: `astro.config.mjs`
- **Express**: `package.json` with Express
- **Python**: `requirements.txt`, `pyproject.toml`
- **Static Sites**: HTML files

### File Structure Handling
- Automatically skips: `node_modules`, `.git`, `dist`, `build`
- Preserves: Source code, config files, documentation
- Converts: All text files to editable format
- Limits: Files over 1MB get placeholders

## 5. Usage Instructions

### For Users
1. **Sign In**: Use "Sign in with GitHub" on the login page
2. **Authorize**: Grant permissions when prompted
3. **Import**: Click "Open GitHub Repository" on dashboard
4. **Select**: Choose repository and branch
5. **Code**: Start editing in the IDE

### For Repository Access
- **Public repos**: Accessible to anyone who imports
- **Private repos**: Only accessible to the repository owner
- **Organization repos**: Accessible to organization members

## 6. Troubleshooting

### Common Issues

#### "Authorization callback URL mismatch"
- Ensure the callback URL in GitHub matches exactly: `http://localhost:3000/api/auth/callback/github`
- Check for trailing slashes or typos

#### "Repository not found" 
- Verify you have access to the repository
- Check if the repository is private and you're the owner
- Ensure the GitHub token has proper permissions

#### "Rate limiting"
- GitHub API has rate limits (5000 requests/hour for authenticated users)
- Large repositories may hit these limits
- Try again after the rate limit resets

#### "File not loading"
- Files over 1MB are not imported
- Binary files get placeholder content
- Check file extensions are supported

### Debug Steps
1. Check environment variables are set correctly
2. Verify GitHub OAuth app configuration
3. Test with a simple public repository first
4. Check browser console for error messages

## 7. Security Considerations

### Token Storage
- Access tokens are stored in the session
- Tokens are used only for repository access
- No tokens are stored permanently in the database

### Repository Privacy
- Private repositories remain private
- Only authorized users can import private repos
- No repository data is stored on our servers beyond the session

### Best Practices
- Use strong, unique secrets for production
- Regularly rotate GitHub OAuth credentials
- Monitor GitHub security alerts
- Review imported repositories for sensitive data

## 8. Production Deployment

### Environment Setup
```env
# Production Environment Variables
GITHUB_ID=your_production_github_client_id
GITHUB_SECRET=your_production_github_client_secret
NEXTAUTH_SECRET=your_production_secret_key
NEXTAUTH_URL=https://your-domain.com
```

### GitHub OAuth App Update
1. Update callback URL to production domain
2. Update homepage URL to production domain
3. Test the integration thoroughly

### Deployment Checklist
- [ ] GitHub OAuth app configured for production
- [ ] Environment variables set in production
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Test repository import functionality
- [ ] Monitor for any authentication errors

## 9. API Reference

### Available Endpoints

#### `GET /api/github/repos`
Fetch user repositories
- **Auth**: Required
- **Params**: `q` (search), `page`, `per_page`
- **Returns**: Array of repositories

#### `POST /api/github/import`
Import repository structure
- **Auth**: Required  
- **Body**: `{ repoUrl, branch }`
- **Returns**: Repository structure and metadata

### Response Formats

#### Repository List
```json
{
  "repositories": [
    {
      "id": 123456,
      "name": "my-project",
      "full_name": "username/my-project",
      "description": "Project description",
      "private": false,
      "language": "TypeScript",
      "stargazers_count": 42,
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total_count": 1
}
```

#### Import Response
```json
{
  "success": true,
  "repository": {
    "owner": "username",
    "name": "my-project", 
    "branch": "main",
    "contents": {
      // File structure
    }
  }
}
```

---

For additional support or questions, please check our [documentation](README.md) or [open an issue](https://github.com/SouptikTaran/AutoIDE/issues).
