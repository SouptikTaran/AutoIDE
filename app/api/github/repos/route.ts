import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAccountByUserId } from "@/features/auth/actions";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "30");

    // Get user's GitHub account to retrieve access token
    const account = await getAccountByUserId(session.user.id);
    
    if (!account || account.provider !== "github" || !account.accessToken) {
      return NextResponse.json({ 
        error: "GitHub account not connected. Please sign in with GitHub to access repositories." 
      }, { status: 401 });
    }

    const url = query 
      ? `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${session.user.name}&page=${page}&per_page=${per_page}`
      : `https://api.github.com/user/repos?page=${page}&per_page=${per_page}&sort=updated&type=owner`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Web-Coder-IDE",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("GitHub API error details:", errorText);
      
      if (response.status === 401) {
        return NextResponse.json({ 
          error: "GitHub authentication expired. Please sign out and sign in again." 
        }, { status: 401 });
      }
      
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Format the response based on whether it's a search or direct repos call
    const repos = query ? data.items : data;
    const total_count = query ? data.total_count : repos.length;

    return NextResponse.json({
      repositories: repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        private: repo.private,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        default_branch: repo.default_branch,
        language: repo.language,
        size: repo.size,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
      })),
      total_count,
      page,
      per_page,
    });
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
