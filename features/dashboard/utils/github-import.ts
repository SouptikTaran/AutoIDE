import { TemplateFolder, TemplateFile } from "@/features/playground/libs/path-to-json";

export interface GitHubRepositoryData {
  owner: string;
  name: string;
  branch: string;
  contents: any;
  repoInfo?: {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
    html_url: string;
  };
}

export function convertGitHubRepoToTemplateFormat(repoData: GitHubRepositoryData): TemplateFolder {
  const { owner, name, contents, repoInfo } = repoData;
  
  // Create the root folder structure
  const templateFolder: TemplateFolder = {
    folderName: name,
    items: convertContentsToItems(contents, ""),
  };

  return templateFolder;
}

function convertContentsToItems(contents: any, basePath: string): (TemplateFile | TemplateFolder)[] {
  const items: (TemplateFile | TemplateFolder)[] = [];

  for (const [itemName, itemData] of Object.entries(contents)) {
    const item = itemData as any;
    const itemPath = basePath ? `${basePath}/${itemName}` : itemName;

    if (item.type === "file") {
      // Convert to TemplateFile
      items.push({
        filename: itemName,
        content: item.content || "",
        fileExtension: getFileExtension(itemName),
      });
    } else if (item.type === "folder" && item.children) {
      // Convert to TemplateFolder recursively
      items.push({
        folderName: itemName,
        items: convertContentsToItems(item.children, itemPath),
      });
    }
  }

  return items;
}

function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  return lastDotIndex === -1 ? "" : filename.substring(lastDotIndex);
}

function getLanguageFromExtension(filename: string): string {
  const extension = getFileExtension(filename).toLowerCase();
  
  const languageMap: Record<string, string> = {
    ".js": "javascript",
    ".jsx": "javascript",
    ".ts": "typescript",
    ".tsx": "typescript",
    ".json": "json",
    ".html": "html",
    ".htm": "html",
    ".css": "css",
    ".scss": "scss",
    ".sass": "sass",
    ".less": "less",
    ".md": "markdown",
    ".txt": "plaintext",
    ".yml": "yaml",
    ".yaml": "yaml",
    ".xml": "xml",
    ".svg": "xml",
    ".py": "python",
    ".rb": "ruby",
    ".php": "php",
    ".java": "java",
    ".c": "c",
    ".cpp": "cpp",
    ".h": "c",
    ".cs": "csharp",
    ".go": "go",
    ".rs": "rust",
    ".swift": "swift",
    ".kt": "kotlin",
    ".scala": "scala",
    ".clj": "clojure",
    ".hs": "haskell",
    ".elm": "elm",
    ".vue": "vue",
    ".svelte": "svelte",
    ".astro": "astro",
    ".sh": "shell",
    ".bash": "shell",
    ".zsh": "shell",
    ".fish": "shell",
    ".ps1": "powershell",
    ".bat": "batch",
    ".cmd": "batch",
    ".dockerfile": "dockerfile",
  };

  // Special cases for files without extensions
  const filenameMap: Record<string, string> = {
    "dockerfile": "dockerfile",
    "makefile": "makefile",
    "rakefile": "ruby",
    "gemfile": "ruby",
    "procfile": "plaintext",
    ".gitignore": "plaintext",
    ".gitattributes": "plaintext",
    ".env": "plaintext",
    ".env.example": "plaintext",
    ".env.local": "plaintext",
    ".editorconfig": "plaintext",
    ".prettierrc": "json",
    ".eslintrc": "json",
    ".babelrc": "json",
    "package.json": "json",
    "tsconfig.json": "json",
    "composer.json": "json",
    "cargo.toml": "toml",
  };

  const lowerFilename = filename.toLowerCase();
  
  return languageMap[extension] || filenameMap[lowerFilename] || "plaintext";
}

export function generatePlaygroundNameFromRepo(repoData: GitHubRepositoryData): string {
  const { name, repoInfo } = repoData;
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return `${name}-${timestamp}`;
}

export function generatePlaygroundDescription(repoData: GitHubRepositoryData): string {
  const { repoInfo } = repoData;
  
  if (repoInfo?.description) {
    return `Imported from GitHub: ${repoInfo.description}`;
  }
  
  return `Imported GitHub repository: ${repoData.owner}/${repoData.name}`;
}

export function detectFrameworkFromRepo(contents: any): string {
  // Check for specific files that indicate framework/technology
  const rootFiles = Object.keys(contents);
  
  // React/Next.js detection
  if (rootFiles.includes("next.config.js") || rootFiles.includes("next.config.ts")) {
    return "nextjs";
  }
  
  // Vue/Nuxt detection
  if (rootFiles.includes("nuxt.config.js") || rootFiles.includes("nuxt.config.ts")) {
    return "nuxt";
  }
  
  if (rootFiles.includes("vue.config.js") || rootFiles.includes("vite.config.js")) {
    return "vue";
  }
  
  // Angular detection
  if (rootFiles.includes("angular.json")) {
    return "angular";
  }
  
  // Svelte/SvelteKit detection
  if (rootFiles.includes("svelte.config.js")) {
    return "svelte";
  }
  
  // Astro detection
  if (rootFiles.includes("astro.config.mjs") || rootFiles.includes("astro.config.js")) {
    return "astro";
  }
  
  // Generic React detection
  if (rootFiles.includes("package.json")) {
    const packageJsonContent = contents["package.json"];
    if (packageJsonContent?.content) {
      try {
        const packageJson = JSON.parse(packageJsonContent.content);
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        if (deps.react) return "react";
        if (deps.vue) return "vue";
        if (deps["@angular/core"]) return "angular";
        if (deps.svelte) return "svelte";
        if (deps.astro) return "astro";
        if (deps.express) return "express";
      } catch (e) {
        // Failed to parse package.json
      }
    }
  }
  
  // Python detection
  if (rootFiles.includes("requirements.txt") || rootFiles.includes("pyproject.toml")) {
    return "python";
  }
  
  // Default fallback
  return "static";
}
