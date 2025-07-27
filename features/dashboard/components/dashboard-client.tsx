"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AddNewButton from "@/features/dashboard/components/add-new-btn";
import AddRepo from "@/features/dashboard/components/add-repo";
import ProjectTable from "@/features/dashboard/components/project-table";
import { getAllPlaygroundForUser, deleteProjectById, editProjectById, duplicateProjectById } from "@/features/playground/actions";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PlaygroundData {
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

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <img src="/empty-state.svg" alt="No projects" className="w-48 h-48 mb-4 opacity-80" />
    <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">No projects found</h2>
    <p className="text-gray-500 dark:text-gray-500">Create a new project to get started!</p>
  </div>
);

interface DashboardClientProps {
  initialPlaygrounds: PlaygroundData[];
}

export function DashboardClient({ initialPlaygrounds }: DashboardClientProps) {
  const [playgrounds, setPlaygrounds] = useState<PlaygroundData[]>(initialPlaygrounds);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  // Auto-refresh when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      refreshPlaygrounds();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshPlaygrounds();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Auto-refresh every 30 seconds when page is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        refreshPlaygrounds(true); // Silent refresh
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshPlaygrounds = useCallback(async (silent = false) => {
    try {
      if (!silent) setIsRefreshing(true);
      
      const updatedPlaygrounds = await getAllPlaygroundForUser();
      
      if (updatedPlaygrounds) {
        // Filter out any invalid playground data and ensure required fields exist
        const validPlaygrounds = updatedPlaygrounds.filter((playground: any) => 
          playground && 
          playground.id && 
          playground.title && 
          playground.template &&
          playground.createdAt &&
          playground.updatedAt &&
          playground.userId
        );
        
        setPlaygrounds(validPlaygrounds as PlaygroundData[]);
        
        if (!silent && validPlaygrounds.length !== playgrounds.length) {
          toast.success("Projects updated!");
        }
      }
    } catch (error) {
      console.error("Error refreshing playgrounds:", error);
      if (!silent) {
        toast.error("Failed to refresh projects");
      }
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  }, [playgrounds.length]);

  const handleProjectCreated = useCallback((newProject: PlaygroundData) => {
    setPlaygrounds(prev => [newProject, ...prev]);
    toast.success("Project created successfully!");
  }, []);

  const handleProjectImported = useCallback((importedProject: PlaygroundData) => {
    setPlaygrounds(prev => [importedProject, ...prev]);
    toast.success("Repository imported successfully!");
  }, []);

  const handleDeleteProject = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await deleteProjectById(id);
      setPlaygrounds(prev => prev.filter(p => p.id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditProject = useCallback(async (id: string, data: { title: string; description: string }) => {
    try {
      setIsLoading(true);
      await editProjectById(id, data);
      
      setPlaygrounds(prev => prev.map(p => 
        p.id === id 
          ? { ...p, title: data.title, description: data.description, updatedAt: new Date() }
          : p
      ));
      
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error("Error editing project:", error);
      toast.error("Failed to update project");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDuplicateProject = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const duplicatedProject = await duplicateProjectById(id);
      
      if (duplicatedProject) {
        // Refresh to get the complete project data
        await refreshPlaygrounds();
        toast.success("Project duplicated successfully!");
      }
    } catch (error) {
      console.error("Error duplicating project:", error);
      toast.error("Failed to duplicate project");
    } finally {
      setIsLoading(false);
    }
  }, [refreshPlaygrounds]);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/30 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-indigo-100/20 to-transparent dark:from-indigo-900/10 dark:to-transparent rounded-full blur-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
          <AddNewButton onProjectCreated={handleProjectCreated} />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
          <AddRepo onProjectImported={handleProjectImported} />
        </div>
      </div>
      
      <div className="mt-10 flex flex-col justify-center items-center w-full relative z-10">
        {playgrounds && playgrounds.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg w-full max-w-2xl">
            <EmptyState />
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg w-full overflow-hidden">
            <div className="border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Projects ({playgrounds.length})
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Live Updates</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshPlaygrounds()}
                    disabled={isRefreshing}
                    className="flex items-center gap-2"
                  >
                    {isRefreshing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                  </Button>
                </div>
              </div>
            </div>
            <ProjectTable 
              playgrounds={playgrounds}
              onDelete={handleDeleteProject}
              onEdit={handleEditProject}
              onDuplicate={handleDuplicateProject}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
