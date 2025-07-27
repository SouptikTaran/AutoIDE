import AddNewButton from "@/features/dashboard/components/add-new-btn";
import AddRepo from "@/features/dashboard/components/add-repo";
import ProjectTable from "@/features/dashboard/components/project-table";
import { getAllPlaygroundForUser, deleteProjectById, editProjectById, duplicateProjectById } from "@/features/playground/actions";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <img src="/empty-state.svg" alt="No projects" className="w-48 h-48 mb-4 opacity-80" />
    <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">No projects found</h2>
    <p className="text-gray-500 dark:text-gray-500">Create a new project to get started!</p>
  </div>
);

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  console.log(playgrounds);
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/30 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-indigo-100/20 to-transparent dark:from-indigo-900/10 dark:to-transparent rounded-full blur-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
          <AddNewButton />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
          <AddRepo />
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
                  Your Projects
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Active</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* @ts-ignore */}
              <ProjectTable
                projects={playgrounds || []}
                onDeleteProject={deleteProjectById}
                onUpdateProject={editProjectById}
                onDuplicateProject={duplicateProjectById}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMainPage;