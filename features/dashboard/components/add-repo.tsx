import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const AddRepo = () => {
  return (
    <div
      className="group px-6 py-6 flex flex-row justify-between items-center
      rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 
      shadow-sm hover:shadow-lg 
      transition-all duration-300 ease-in-out 
      hover:bg-gray-50 dark:hover:bg-slate-800 
      hover:border-blue-300 dark:hover:border-blue-600 
      cursor-pointer"
    >
      <div className="flex flex-row justify-center items-start gap-4">
        <Button
          variant="outline"
          className="flex justify-center items-center 
          bg-blue-50 dark:bg-blue-950/30 
          border border-blue-200 dark:border-blue-800 
          text-blue-600 dark:text-blue-400 
          hover:bg-blue-100 dark:hover:bg-blue-900 
          hover:border-blue-300 dark:hover:border-blue-600 
          transition-colors duration-300"
          size="icon"
        >
          <ArrowDown
            size={30}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </Button>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Open GitHub Repository
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[220px] leading-snug">
            Work with your repositories in our editor
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden transition-opacity duration-300 group-hover:opacity-90">
        <Image
          src="/github.svg"
          alt="Open GitHub repository"
          width={150}
          height={150}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
};

export default AddRepo;
