import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAccountByUserId } from "@/features/auth/actions";

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { repoUrl, branch = "main" } = await request.json();
    
    if (!repoUrl) {
      return NextResponse.json({ error: "Repository URL is required" }, { status: 400 });
    }

    // Parse GitHub URL
    const urlMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!urlMatch) {
      return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
    }

    const [, owner, repo] = urlMatch;
    const repoName = repo.replace(/\.git$/, ""); // Remove .git suffix if present

    // Get user's GitHub account to retrieve access token
    const account = await getAccountByUserId(session.user.id);
    
    if (!account || account.provider !== "github" || !account.accessToken) {
      return NextResponse.json({ 
        error: "GitHub account not connected. Please sign in with GitHub to import repositories." 
      }, { status: 401 });
    }

    // Get repository contents recursively
    const repoContents = await fetchRepositoryContents(account.accessToken, owner, repoName, branch);
    
    if (!repoContents) {
      return NextResponse.json({ error: "Failed to fetch repository contents" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      repository: {
        owner,
        name: repoName,
        branch,
        contents: repoContents,
      },
    });
  } catch (error) {
    console.error("Error importing GitHub repository:", error);
    return NextResponse.json(
      { error: "Failed to import repository" },
      { status: 500 }
    );
  }
}

async function fetchRepositoryContents(
  accessToken: string,
  owner: string,
  repo: string,
  branch: string,
  path: string = ""
): Promise<any> {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Web-Coder-IDE",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Path not found: ${path}`);
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const contents: GitHubContent[] = await response.json();
    const result: any = {};

    for (const item of contents) {
      if (item.type === "file") {
        // Fetch file content for text files
        if (item.size < 1024 * 1024 && isTextFile(item.name)) { // Only files < 1MB and text files
          try {
            const fileResponse = await fetch(item.url, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "User-Agent": "Web-Coder-IDE",
              },
            });

            if (fileResponse.ok) {
              const fileData = await fileResponse.json();
              const content = fileData.encoding === "base64" 
                ? Buffer.from(fileData.content, "base64").toString("utf-8")
                : fileData.content;

              result[item.name] = {
                type: "file",
                content,
                size: item.size,
                path: item.path,
              };
            }
          } catch (error) {
            console.warn(`Failed to fetch content for ${item.path}:`, error);
            result[item.name] = {
              type: "file",
              content: `// Failed to load content for ${item.name}`,
              size: item.size,
              path: item.path,
            };
          }
        } else {
          // For large files or binary files, just include metadata
          result[item.name] = {
            type: "file",
            content: item.size > 1024 * 1024 
              ? `// File too large to display (${(item.size / 1024 / 1024).toFixed(2)}MB)`
              : `// Binary file: ${item.name}`,
            size: item.size,
            path: item.path,
          };
        }
      } else if (item.type === "dir") {
        // Skip common directories that might be large or unnecessary
        if (shouldSkipDirectory(item.name)) {
          continue;
        }

        const subdirContents = await fetchRepositoryContents(
          accessToken,
          owner,
          repo,
          branch,
          item.path
        );
        
        if (subdirContents) {
          result[item.name] = {
            type: "folder",
            children: subdirContents,
            path: item.path,
          };
        }
      }
    }

    return result;
  } catch (error) {
    console.error(`Error fetching contents for path ${path}:`, error);
    return null;
  }
}

function isTextFile(filename: string): boolean {
  const textExtensions = [
    ".js", ".jsx", ".ts", ".tsx", ".json", ".html", ".css", ".scss", ".sass",
    ".less", ".md", ".txt", ".yml", ".yaml", ".xml", ".svg", ".py", ".rb",
    ".php", ".java", ".c", ".cpp", ".h", ".cs", ".go", ".rs", ".swift",
    ".kt", ".scala", ".clj", ".hs", ".elm", ".vue", ".svelte", ".astro",
    ".sh", ".bash", ".zsh", ".fish", ".ps1", ".bat", ".cmd", ".dockerfile",
    ".gitignore", ".gitattributes", ".env", ".env.example", ".editorconfig",
    ".prettierrc", ".eslintrc", ".babelrc", ".tsconfig", ".package",
  ];

  const extension = filename.toLowerCase().substring(filename.lastIndexOf("."));
  return textExtensions.includes(extension) || !filename.includes(".");
}

function shouldSkipDirectory(dirname: string): boolean {
  const skipDirs = [
    "node_modules", ".git", ".next", ".nuxt", "dist", "build", 
    ".vercel", ".netlify", "coverage", ".nyc_output", "target",
    "vendor", "__pycache__", ".pytest_cache", ".mypy_cache",
    ".gradle", ".idea", ".vscode", ".DS_Store", "Thumbs.db"
  ];

  return skipDirs.includes(dirname) || dirname.startsWith(".");
}
