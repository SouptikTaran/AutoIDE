"use client";
import TemplateSelectionModal from "@/components/modal/template-selector-modal";
import { Button } from "@/components/ui/button"
import { createPlayground } from "@/features/playground/actions";
import { Plus } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

// Define valid template types
type ValidTemplate = 
  | "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"
  | "ASTRO" | "TYPESCRIPT" | "JAVASCRIPT" | "NODE" | "BOOTSTRAP" 
  | "GRAPHQL" | "NUXT" | "SVELTE" | "QUASAR" | "KOA" | "VITE" 
  | "EXPO" | "QWIK" | "GSAP_REACT" | "GSAP_NEXT" | "GSAP_NUXT" 
  | "GSAP_SVELTE" | "GSAP_SVELTEKIT" | "GSAP_VUE" | "SVELTEKIT" 
  | "STATIC" | "JSON_SERVER" | "JSON_GRAPHQL" | "SLIDEV" 
  | "TUTORIALKIT" | "TRES" | "BOLT_VITE_REACT" | "BOLT_EXPO" 
  | "BOLT_QWIK" | "BOLT_REMOTION" | "RXJS" | "NODEMON" | "EGG" | "TEST";

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

interface AddNewButtonProps {
  onProjectCreated?: (project: PlaygroundData) => void;
}

const AddNewButton = ({ onProjectCreated }: AddNewButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    template: ValidTemplate;
    description?: string;
  } | null>(null)
  const router = useRouter()

  const handleSubmit = async(data: {
    title: string;
    template: ValidTemplate;
    description?: string;
  }) => {
    try {
      setIsCreating(true)
      setSelectedTemplate(data)
      
      // Show loading toast
      toast.loading("Creating your playground...", {
        id: "creating-playground"
      });
      
      const res = await createPlayground(data);
      
      // Dismiss loading toast and show success
      toast.dismiss("creating-playground");
      toast.success("Playground created successfully! Redirecting...", {
        duration: 2000
      });
      
      console.log("Creating new playground:", data)
      setIsModalOpen(false)
      
      // Call the callback if provided
      if (onProjectCreated && res) {
        onProjectCreated(res as PlaygroundData);
      }
      
      // Small delay to show success message before redirect
      setTimeout(() => {
        router.push(`/playground/${res?.id}`)
      }, 1000)
      
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss("creating-playground");
      toast.error("Failed to create playground. Please try again.");
      console.error("Error creating playground:", error);
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group px-6 py-6 flex flex-row justify-between items-center border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.02]
        shadow-sm hover:shadow-lg"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:border-blue-400 dark:group-hover:border-blue-600 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all duration-300"
            size={"icon"}
          >
            <Plus size={30} className="transition-transform duration-300 group-hover:rotate-90" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Add New</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[220px]">Create a new playground</p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={"/add-new.svg"}
            alt="Create new playground"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
        </div>
      </div>
      
      <TemplateSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        isCreating={isCreating}
      />
    </>
  )
}

export default AddNewButton