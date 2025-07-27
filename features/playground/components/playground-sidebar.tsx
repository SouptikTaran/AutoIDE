"use client"

import * as React from "react"
import { Files, GitBranch } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TemplateFileTree } from "./playground-explorer"
import type { TemplateFolder, TemplateFile } from "@/features/playground/libs/path-to-json"

interface PlaygroundSidebarProps {
  // File explorer props
  data: TemplateFolder
  onFileSelect?: (file: TemplateFile) => void
  selectedFile?: TemplateFile | null
  onAddFile?: (path: string, name: string) => void
  onAddFolder?: (path: string, name: string) => void
  onDeleteFile?: (path: string) => void
  onDeleteFolder?: (path: string) => void
  onRenameFile?: (oldPath: string, newPath: string) => void
  onRenameFolder?: (oldPath: string, newPath: string) => void
}

export function PlaygroundSidebar({
  data,
  onFileSelect,
  selectedFile,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  onRenameFile,
  onRenameFolder,
}: PlaygroundSidebarProps) {
  const [activeTab, setActiveTab] = React.useState("files")

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-background">
            <TabsTrigger 
              value="files" 
              className="flex items-center gap-2 data-[state=active]:bg-muted"
            >
              <Files className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Files</span>
            </TabsTrigger>
            <TabsTrigger 
              value="git" 
              className="flex items-center gap-2 data-[state=active]:bg-muted"
            >
              <GitBranch className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Git</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="files" className="flex-1 m-0 p-0">
            <div className="h-full">
              <TemplateFileTree
                data={data}
                onFileSelect={onFileSelect}
                selectedFile={selectedFile}
                title=""
                onAddFile={onAddFile}
                onAddFolder={onAddFolder}
                onDeleteFile={onDeleteFile}
                onDeleteFolder={onDeleteFolder}
                onRenameFile={onRenameFile}
                onRenameFolder={onRenameFolder}
              />
            </div>
          </TabsContent>
          
        </Tabs>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
