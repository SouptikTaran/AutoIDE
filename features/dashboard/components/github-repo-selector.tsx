"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  GitBranch,
  Star,
  GitFork,
  Calendar,
  ExternalLink,
  Download,
  Loader2,
  AlertCircle,
  Github,
} from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  clone_url: string;
  default_branch: string;
  language: string | null;
  size: number;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

interface GitHubRepoSelectorProps {
  onImport: (repoData: any) => void;
  children: React.ReactNode;
}

export function GitHubRepoSelector({ onImport, children }: GitHubRepoSelectorProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"updated" | "name" | "stars">("updated");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle GitHub sign-in
  const handleGitHubSignIn = async () => {
    try {
      await signIn("github", { callbackUrl: window.location.href });
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      toast.error("Failed to sign in with GitHub");
    }
  };

  // Fetch repositories when dialog opens
  useEffect(() => {
    if (isOpen && session?.user) {
      fetchRepositories();
    }
  }, [isOpen, session]);

  // Filter and sort repositories
  useEffect(() => {
    let filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort repositories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    setFilteredRepos(filtered);
  }, [repositories, searchQuery, sortBy]);

  const fetchRepositories = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/github/repos");
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        
        if (response.status === 401) {
          setError("github_auth_required");
          return;
        }
        
        throw new Error(errorData.error || "Failed to fetch repositories");
      }
      
      const data = await response.json();
      setRepositories(data.repositories || []);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load repositories. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (repo: GitHubRepo) => {
    if (!repo) return;
    
    setIsImporting(true);
    setSelectedRepo(repo);
    
    try {
      const response = await fetch("/api/github/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: repo.html_url,
          branch: repo.default_branch,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        
        if (response.status === 401) {
          throw new Error(errorData.error || "GitHub authentication required");
        }
        
        throw new Error(errorData.error || "Import failed");
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success(`Successfully imported ${repo.name}`);
        onImport({
          ...data.repository,
          repoInfo: repo,
        });
        setIsOpen(false);
      } else {
        throw new Error(data.error || "Import failed");
      }
    } catch (error) {
      console.error("Error importing repository:", error);
      const errorMessage = error instanceof Error ? error.message : `Failed to import ${repo.name}`;
      toast.error(errorMessage);
    } finally {
      setIsImporting(false);
      setSelectedRepo(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!session?.user) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              GitHub Sign In Required
            </DialogTitle>
            <DialogDescription>
              You need to sign in with GitHub to import repositories.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <Github className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium mb-2">Connect Your GitHub Account</p>
              <p className="text-sm text-muted-foreground mb-4">
                Sign in with GitHub to access your repositories and import them into the editor.
              </p>
              <Button 
                onClick={handleGitHubSignIn}
                className="w-full"
                disabled={false}
              >
                <Github className="h-4 w-4 mr-2" />
                Sign In with GitHub
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Import GitHub Repository
          </DialogTitle>
          <DialogDescription>
            Select a repository from your GitHub account to import into the editor.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Search and Sort Controls */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Last Updated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="stars">Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Repository List */}
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error === "github_auth_required" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Github className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">GitHub Connection Required</p>
                <p className="text-muted-foreground mb-4">
                  You need to connect your GitHub account to access repositories.
                </p>
                <Button onClick={handleGitHubSignIn} className="mb-2">
                  <Github className="h-4 w-4 mr-2" />
                  Connect GitHub Account
                </Button>
                <Button variant="outline" onClick={fetchRepositories}>
                  Try Again
                </Button>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <p className="text-lg font-medium mb-2">Unable to Load Repositories</p>
                <p className="text-muted-foreground mb-4 max-w-md">{error}</p>
                {error.includes("GitHub account not connected") ? (
                  <div className="space-y-2">
                    <Button onClick={() => window.location.href = '/auth/sign-in'}>
                      Sign In with GitHub
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      You need to sign in with your GitHub account to access repositories
                    </p>
                  </div>
                ) : (
                  <Button onClick={fetchRepositories}>Try Again</Button>
                )}
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No Repositories Found</p>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search terms" : "Create some repositories on GitHub first"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRepos.map((repo) => (
                  <Card 
                    key={repo.id} 
                    className={`transition-all hover:shadow-md ${
                      isImporting && selectedRepo?.id === repo.id 
                        ? "ring-2 ring-primary" 
                        : "hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{repo.name}</h3>
                            {repo.private && (
                              <Badge variant="secondary" className="text-xs">
                                Private
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => window.open(repo.html_url, "_blank")}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {repo.description && (
                            <p className="text-muted-foreground text-sm">{repo.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {repo.language && (
                              <Badge variant="outline" className="text-xs">
                                {repo.language}
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {repo.stargazers_count}
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              {repo.forks_count}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(repo.updated_at)}
                            </div>
                            <span>{formatSize(repo.size * 1024)}</span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleImport(repo)}
                          disabled={isImporting}
                          className="ml-4"
                        >
                          {isImporting && selectedRepo?.id === repo.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Importing...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Import
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
