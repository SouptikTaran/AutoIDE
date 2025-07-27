export interface PlaygroundData {
  id: string;
  title: string;
  description: string | null;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  Starmark?: Array<{
    isMarked: boolean;
  }>;
}

export interface GitHubRepositoryData {
  name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  clone_url: string;
  default_branch: string;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
