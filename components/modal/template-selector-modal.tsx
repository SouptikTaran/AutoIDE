"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Search,
  Star,
  Code,
  Server,
  Globe,
  Zap,
  Clock,
  Check,
  Plus,
  Loader2,
} from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiExpress, 
  SiVuedotjs, 
  SiAngular,
  SiAstro,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiBootstrap,
  SiGraphql,
  SiNuxtdotjs,
  SiSvelte,
  SiQuasar,
  SiKoa,
  SiVite,
  SiExpo,
  SiQwik,
} from "react-icons/si";
import { TbFlame, TbJson, TbSlideshow, TbTestPipe, TbDeviceMobile, TbBrandNodejs } from "react-icons/tb";
import { useState } from "react";

// TemplateSelectionModal.tsx
type TemplateSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR" | "ASTRO" | "TYPESCRIPT" | "JAVASCRIPT" | "NODE" | "BOOTSTRAP" | "GRAPHQL" | "NUXT" | "SVELTE" | "QUASAR" | "KOA" | "VITE" | "EXPO" | "QWIK" | "GSAP_REACT" | "GSAP_NEXT" | "GSAP_NUXT" | "GSAP_SVELTE" | "GSAP_SVELTEKIT" | "GSAP_VUE" | "SVELTEKIT" | "STATIC" | "JSON_SERVER" | "JSON_GRAPHQL" | "SLIDEV" | "TUTORIALKIT" | "TRES" | "BOLT_VITE_REACT" | "BOLT_EXPO" | "BOLT_QWIK" | "BOLT_REMOTION" | "RXJS" | "NODEMON" | "EGG" | "TEST";
    description?: string;
  }) => void;
  isCreating?: boolean;
};

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  popularity: number;
  tags: string[];
  features: string[];
  category: "frontend" | "backend" | "fullstack";
}

const templates: TemplateOption[] = [
  // Frontend Frameworks
  {
    id: "react",
    name: "React",
    description: "A JavaScript library for building user interfaces with component-based architecture",
    icon: SiReact,
    color: "#61DAFB",
    popularity: 5,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Component-Based", "Virtual DOM", "JSX Support"],
    category: "frontend",
  },
  {
    id: "react-ts",
    name: "React TypeScript",
    description: "React with TypeScript for type-safe component development",
    icon: SiReact,
    color: "#61DAFB",
    popularity: 5,
    tags: ["UI", "Frontend", "TypeScript"],
    features: ["Type Safety", "Component-Based", "Virtual DOM"],
    category: "frontend",
  },
  {
    id: "vue",
    name: "Vue.js",
    description: "Progressive JavaScript framework for building user interfaces",
    icon: SiVuedotjs,
    color: "#4FC08D",
    popularity: 4,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
    category: "frontend",
  },
  {
    id: "angular",
    name: "Angular",
    description: "Platform for building mobile and desktop web applications",
    icon: SiAngular,
    color: "#DD0031",
    popularity: 4,
    tags: ["Frontend", "TypeScript", "Framework"],
    features: ["Dependency Injection", "TypeScript Support", "Component System"],
    category: "frontend",
  },
  {
    id: "svelte",
    name: "Svelte",
    description: "Cybernetically enhanced web apps with compile-time optimizations",
    icon: SiSvelte,
    color: "#FF3E00",
    popularity: 4,
    tags: ["Frontend", "Compiler", "Performance"],
    features: ["No Runtime", "Reactive", "Small Bundle Size"],
    category: "frontend",
  },
  {
    id: "qwik",
    name: "Qwik",
    description: "The HTML-first framework for instant loading web apps",
    icon: SiQwik,
    color: "#AC7EF4",
    popularity: 3,
    tags: ["Frontend", "Performance", "Resumable"],
    features: ["Instant Loading", "Resumable", "Fine-Grained Lazy Loading"],
    category: "frontend",
  },

  // Full-Stack Frameworks
  {
    id: "nextjs",
    name: "Next.js",
    description: "The React framework for production with server-side rendering",
    icon: SiNextdotjs,
    color: "#000000",
    popularity: 5,
    tags: ["React", "SSR", "Fullstack"],
    features: ["Server Components", "API Routes", "File-based Routing"],
    category: "fullstack",
  },
  {
    id: "nextjs-shadcn",
    name: "Next.js + shadcn/ui",
    description: "Next.js with shadcn/ui components and Tailwind CSS",
    icon: SiNextdotjs,
    color: "#000000",
    popularity: 5,
    tags: ["React", "UI Library", "Tailwind"],
    features: ["shadcn/ui", "Tailwind CSS", "TypeScript"],
    category: "fullstack",
  },
  {
    id: "nuxt",
    name: "Nuxt.js",
    description: "The intuitive Vue framework for building full-stack applications",
    icon: SiNuxtdotjs,
    color: "#00DC82",
    popularity: 4,
    tags: ["Vue", "SSR", "Fullstack"],
    features: ["Auto-imports", "Server-side Rendering", "File-based Routing"],
    category: "fullstack",
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    description: "The fastest way to build Svelte apps with server-side rendering",
    icon: SiSvelte,
    color: "#FF3E00",
    popularity: 4,
    tags: ["Svelte", "SSR", "Fullstack"],
    features: ["Server-side Rendering", "File-based Routing", "Adapters"],
    category: "fullstack",
  },
  {
    id: "astro-shadcn",
    name: "Astro + shadcn/ui",
    description: "Static site generator with islands architecture and shadcn/ui",
    icon: SiAstro,
    color: "#FF5D01",
    popularity: 4,
    tags: ["Static", "Islands", "Multi-framework"],
    features: ["Islands Architecture", "Zero JS by Default", "Multi-framework"],
    category: "fullstack",
  },
  {
    id: "quasar",
    name: "Quasar",
    description: "Vue.js based framework for building cross-platform applications",
    icon: SiQuasar,
    color: "#1976D2",
    popularity: 3,
    tags: ["Vue", "Cross-platform", "Mobile"],
    features: ["Material Design", "Cross-platform", "CLI Tools"],
    category: "fullstack",
  },

  // Backend Frameworks
  {
    id: "express",
    name: "Express.js",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    icon: SiExpress,
    color: "#000000",
    popularity: 5,
    tags: ["Node.js", "API", "Backend"],
    features: ["Middleware", "Routing", "HTTP Utilities"],
    category: "backend",
  },
  {
    id: "hono",
    name: "Hono",
    description: "Fast, lightweight, built on Web Standards",
    icon: TbFlame,
    color: "#e36002",
    popularity: 3,
    tags: ["Node.js", "TypeScript", "Backend"],
    features: ["Web Standards", "TypeScript Support", "Edge Runtime"],
    category: "backend",
  },
  {
    id: "koa",
    name: "Koa.js",
    description: "Next generation web framework for Node.js",
    icon: SiKoa,
    color: "#33333D",
    popularity: 3,
    tags: ["Node.js", "Backend", "Async"],
    features: ["Async/Await", "Middleware", "Error Handling"],
    category: "backend",
  },
  {
    id: "node",
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    icon: SiNodedotjs,
    color: "#339933",
    popularity: 5,
    tags: ["JavaScript", "Runtime", "Backend"],
    features: ["Event-driven", "Non-blocking I/O", "NPM Ecosystem"],
    category: "backend",
  },
  {
    id: "egg",
    name: "Egg.js",
    description: "Enterprise-grade Node.js framework",
    icon: TbBrandNodejs,
    color: "#FF6B00",
    popularity: 2,
    tags: ["Node.js", "Enterprise", "Backend"],
    features: ["Plugin System", "Multi-process", "Security"],
    category: "backend",
  },

  // Utility & Build Tools
  {
    id: "vite",
    name: "Vite",
    description: "Next generation frontend tooling for fast development",
    icon: SiVite,
    color: "#646CFF",
    popularity: 4,
    tags: ["Build Tool", "Dev Server", "Fast"],
    features: ["Hot Module Replacement", "Fast Build", "ES Modules"],
    category: "frontend",
  },
  {
    id: "vite-shadcn",
    name: "Vite + shadcn/ui",
    description: "Vite with React and shadcn/ui components",
    icon: SiVite,
    color: "#646CFF",
    popularity: 4,
    tags: ["React", "UI Library", "Vite"],
    features: ["shadcn/ui", "Tailwind CSS", "Fast HMR"],
    category: "frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "JavaScript with syntax for types",
    icon: SiTypescript,
    color: "#3178C6",
    popularity: 5,
    tags: ["TypeScript", "Type Safety", "Language"],
    features: ["Type Safety", "Modern JavaScript", "IDE Support"],
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Plain JavaScript for web development",
    icon: SiJavascript,
    color: "#F7DF1E",
    popularity: 5,
    tags: ["JavaScript", "Vanilla", "Web"],
    features: ["No Framework", "Pure JavaScript", "Lightweight"],
    category: "frontend",
  },

  // CSS Frameworks
  {
    id: "bootstrap",
    name: "Bootstrap 5",
    description: "Popular CSS framework for responsive web development",
    icon: SiBootstrap,
    color: "#7952B3",
    popularity: 4,
    tags: ["CSS", "Responsive", "Components"],
    features: ["Responsive Grid", "Components", "Utilities"],
    category: "frontend",
  },

  // API & Data
  {
    id: "graphql",
    name: "GraphQL",
    description: "Query language for APIs with a type system",
    icon: SiGraphql,
    color: "#E10098",
    popularity: 4,
    tags: ["API", "Query Language", "Type System"],
    features: ["Type System", "Single Endpoint", "Introspection"],
    category: "backend",
  },
  {
    id: "json-server",
    name: "JSON Server",
    description: "Full fake REST API with zero coding",
    icon: TbJson,
    color: "#000000",
    popularity: 3,
    tags: ["API", "Mock", "REST"],
    features: ["Zero Configuration", "REST API", "Mock Data"],
    category: "backend",
  },
  {
    id: "json-graphql-server",
    name: "JSON GraphQL Server",
    description: "Full fake GraphQL API with zero coding",
    icon: SiGraphql,
    color: "#E10098",
    popularity: 3,
    tags: ["GraphQL", "Mock", "API"],
    features: ["Zero Configuration", "GraphQL API", "Mock Data"],
    category: "backend",
  },

  // Mobile & Cross-platform
  {
    id: "expo",
    name: "Expo",
    description: "Platform for universal React applications",
    icon: SiExpo,
    color: "#000020",
    popularity: 4,
    tags: ["React Native", "Mobile", "Cross-platform"],
    features: ["Universal Apps", "Native APIs", "OTA Updates"],
    category: "fullstack",
  },
  {
    id: "bolt-expo",
    name: "Bolt Expo",
    description: "Enhanced Expo setup with additional tooling",
    icon: SiExpo,
    color: "#000020",
    popularity: 3,
    tags: ["React Native", "Mobile", "Enhanced"],
    features: ["Enhanced Setup", "Additional Tools", "Mobile First"],
    category: "fullstack",
  },

  // Animation & Media
  {
    id: "gsap-react",
    name: "GSAP + React",
    description: "React with GSAP animation library",
    icon: SiReact,
    color: "#61DAFB",
    popularity: 3,
    tags: ["React", "Animation", "GSAP"],
    features: ["High-performance Animations", "Timeline Control", "Cross-browser"],
    category: "frontend",
  },
  {
    id: "gsap-next",
    name: "GSAP + Next.js",
    description: "Next.js with GSAP animation library",
    icon: SiNextdotjs,
    color: "#000000",
    popularity: 3,
    tags: ["Next.js", "Animation", "GSAP"],
    features: ["SSR Animations", "Performance", "Timeline Control"],
    category: "fullstack",
  },
  {
    id: "gsap-vue",
    name: "GSAP + Vue",
    description: "Vue.js with GSAP animation library",
    icon: SiVuedotjs,
    color: "#4FC08D",
    popularity: 3,
    tags: ["Vue", "Animation", "GSAP"],
    features: ["Reactive Animations", "Component Transitions", "Performance"],
    category: "frontend",
  },
  {
    id: "gsap-svelte",
    name: "GSAP + Svelte",
    description: "Svelte with GSAP animation library",
    icon: SiSvelte,
    color: "#FF3E00",
    popularity: 3,
    tags: ["Svelte", "Animation", "GSAP"],
    features: ["Lightweight Animations", "Compile-time Optimization", "Smooth"],
    category: "frontend",
  },
  {
    id: "bolt-remotion",
    name: "Remotion",
    description: "Create videos programmatically with React",
    icon: TbDeviceMobile,
    color: "#5B21B6",
    popularity: 2,
    tags: ["React", "Video", "Programmatic"],
    features: ["Video Generation", "React Components", "Programmatic"],
    category: "frontend",
  },

  // Presentation & Documentation
  {
    id: "slidev",
    name: "Slidev",
    description: "Presentation slides for developers",
    icon: TbSlideshow,
    color: "#3AB2F7",
    popularity: 3,
    tags: ["Presentation", "Vue", "Markdown"],
    features: ["Markdown-based", "Live Coding", "Themes"],
    category: "frontend",
  },
  {
    id: "tutorialkit",
    name: "TutorialKit",
    description: "Create interactive coding tutorials",
    icon: TbTestPipe,
    color: "#FF6B6B",
    popularity: 2,
    tags: ["Tutorial", "Interactive", "Learning"],
    features: ["Interactive Tutorials", "Code Execution", "Step-by-step"],
    category: "frontend",
  },

  // Static & Simple
  {
    id: "static",
    name: "Static HTML",
    description: "Plain HTML, CSS, and JavaScript",
    icon: Code,
    color: "#E34F26",
    popularity: 4,
    tags: ["HTML", "Static", "Simple"],
    features: ["No Build Step", "Simple", "Fast Loading"],
    category: "frontend",
  },
  {
    id: "web-platform",
    name: "Web Platform",
    description: "Modern web APIs and platform features",
    icon: Globe,
    color: "#4285F4",
    popularity: 3,
    tags: ["Web APIs", "Platform", "Modern"],
    features: ["Web APIs", "Platform Features", "Progressive"],
    category: "frontend",
  },

  // Development Tools
  {
    id: "nodemon",
    name: "Nodemon",
    description: "Node.js development with automatic restarts",
    icon: SiNodedotjs,
    color: "#76D04B",
    popularity: 3,
    tags: ["Node.js", "Development", "Auto-restart"],
    features: ["Auto-restart", "File Watching", "Development"],
    category: "backend",
  },
  {
    id: "test",
    name: "Testing Setup",
    description: "Testing environment with popular testing frameworks",
    icon: TbTestPipe,
    color: "#C21807",
    popularity: 4,
    tags: ["Testing", "Jest", "Vitest"],
    features: ["Unit Testing", "Integration Testing", "Coverage"],
    category: "frontend",
  },
];

const TemplateSelectionModal = ({
  isOpen,
  onClose,
  onSubmit,
  isCreating = false,
}: TemplateSelectionModalProps) => {
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");
  const [projectName, setProjectName] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      category === "all" || template.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setStep("configure");
    }
  };

  const handleCreateProject = () => {
    if (selectedTemplate) {
      const templateMap: Record<string, "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR" | "ASTRO" | "TYPESCRIPT" | "JAVASCRIPT" | "NODE" | "BOOTSTRAP" | "GRAPHQL" | "NUXT" | "SVELTE" | "QUASAR" | "KOA" | "VITE" | "EXPO" | "QWIK" | "GSAP_REACT" | "GSAP_NEXT" | "GSAP_NUXT" | "GSAP_SVELTE" | "GSAP_SVELTEKIT" | "GSAP_VUE" | "SVELTEKIT" | "STATIC" | "JSON_SERVER" | "JSON_GRAPHQL" | "SLIDEV" | "TUTORIALKIT" | "TRES" | "BOLT_VITE_REACT" | "BOLT_EXPO" | "BOLT_QWIK" | "BOLT_REMOTION" | "RXJS" | "NODEMON" | "EGG" | "TEST"> = {
        react: "REACT",
        "react-ts": "REACT",
        nextjs: "NEXTJS",
        "nextjs-shadcn": "NEXTJS",
        express: "EXPRESS",
        vue: "VUE",
        hono: "HONO",
        angular: "ANGULAR",
        astro: "ASTRO",
        "astro-shadcn": "ASTRO",
        typescript: "TYPESCRIPT",
        javascript: "JAVASCRIPT",
        node: "NODE",
        bootstrap: "BOOTSTRAP",
        graphql: "GRAPHQL",
        nuxt: "NUXT",
        svelte: "SVELTE",
        quasar: "QUASAR",
        koa: "KOA",
        vite: "VITE",
        "vite-shadcn": "VITE",
        expo: "EXPO",
        qwik: "QWIK",
        "gsap-react": "GSAP_REACT",
        "gsap-next": "GSAP_NEXT",
        "gsap-vue": "GSAP_VUE",
        "gsap-svelte": "GSAP_SVELTE",
        "gsap-nuxt": "GSAP_NUXT",
        "gsap-sveltekit": "GSAP_SVELTEKIT",
        sveltekit: "SVELTEKIT",
        static: "STATIC",
        "json-server": "JSON_SERVER",
        "json-graphql-server": "JSON_GRAPHQL",
        slidev: "SLIDEV",
        tutorialkit: "TUTORIALKIT",
        tres: "TRES",
        "bolt-vite-react": "BOLT_VITE_REACT",
        "bolt-expo": "BOLT_EXPO",
        "bolt-qwik": "BOLT_QWIK",
        "bolt-remotion": "BOLT_REMOTION",
        rxjs: "RXJS",
        nodemon: "NODEMON",
        egg: "EGG",
        test: "TEST",
        "web-platform": "STATIC",
      };

      const template = templates.find((t) => t.id === selectedTemplate);
      onSubmit({
        title: projectName || `New ${template?.name} Project`,
        template: templateMap[selectedTemplate] || "REACT",
        description: template?.description,
      });

      console.log(
        `Creating ${projectName || "new project"} with template: ${
          template?.name
        }`
      );
      onClose();
      // Reset state for next time
      setStep("select");
      setSelectedTemplate(null);
      setProjectName("");
    }
  };

  const handleBack = () => {
    setStep("select");
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isCreating) {
          onClose();
          // Reset state when closing
          setStep("select");
          setSelectedTemplate(null);
          setProjectName("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto" showCloseButton={!isCreating}>
        {step === "select" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Plus size={24} className="text-blue-700 dark:text-blue-400" />
                Select a Template
              </DialogTitle>
              <DialogDescription>
                Choose a template to create your new playground
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 outline-none"
                    size={18}
                  />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Tabs
                  defaultValue="all"
                  className="w-full sm:w-auto"
                  onValueChange={(value) => setCategory(value as any)}
                >
                  <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <RadioGroup
                value={selectedTemplate || ""}
                onValueChange={handleSelectTemplate}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`relative flex p-6 border rounded-lg cursor-pointer
                          transition-all duration-300 hover:scale-[1.02]
                          ${
                            selectedTemplate === template.id
                              ? "border-blue-300 dark:border-blue-700 shadow-[0_0_0_1px_#93C5FD,0_8px_20px_rgba(59,130,246,0.15)] dark:shadow-[0_0_0_1px_#1D4ED8,0_8px_20px_rgba(29,78,216,0.15)]"
                              : "hover:border-blue-300 dark:hover:border-blue-700 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                          }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="absolute top-4 right-4 flex gap-1">
                          {renderStars(template.popularity)}
                        </div>

                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 left-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full p-1">
                            <Check size={14} />
                          </div>
                        )}

                        <div className="flex gap-4">
                          <div
                            className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                          >
                            <template.icon
                              size={40}
                              className={`object-contain ${
                                template.color === "#000000" 
                                  ? "text-gray-900 dark:text-gray-100" 
                                  : ""
                              }`}
                              {...(template.color !== "#000000" && {
                                style: { color: template.color }
                              })}
                            />
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">
                                {template.name}
                              </h3>
                              <div className="flex gap-1">
                                {template.category === "frontend" && (
                                  <Code size={14} className="text-blue-500" />
                                )}
                                {template.category === "backend" && (
                                  <Server
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                                {template.category === "fullstack" && (
                                  <Globe
                                    size={14}
                                    className="text-purple-500"
                                  />
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {template.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                              {template.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 border rounded-2xl"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <RadioGroupItem
                          value={template.id}
                          id={template.id}
                          className="sr-only"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                      <Search size={48} className="text-gray-600 dark:text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">
                        No templates found
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between gap-3 mt-4 pt-4 border-t">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                <span>
                  Estimated setup time:{" "}
                  {selectedTemplate ? "2-5 minutes" : "Select a template"}
                </span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  disabled={!selectedTemplate}
                  onClick={handleContinue}
                >
                  Continue <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                Configure Your Project
              </DialogTitle>
              <DialogDescription>
                {templates.find((t) => t.id === selectedTemplate)?.name} project
                configuration
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="my-awesome-project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="p-4 shadow-[0_0_0_1px_#93C5FD,0_8px_20px_rgba(59,130,246,0.15)] dark:shadow-[0_0_0_1px_#1D4ED8,0_8px_20px_rgba(29,78,216,0.15)] rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium mb-2">Selected Template Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {templates
                    .find((t) => t.id === selectedTemplate)
                    ?.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Zap size={14} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={handleBack} disabled={isCreating}>
                Back
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={handleCreateProject}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;