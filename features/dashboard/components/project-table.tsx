"use client"

import Image from "next/image"
import { format } from "date-fns"
import type { Project } from "../types"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { MoreHorizontal, Edit3, Trash2, ExternalLink, Copy, Download, Eye } from "lucide-react"
import { toast } from "sonner"
import { MarkedToggleButton } from "./toggle-star"

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

interface ProjectTableProps {
  playgrounds: PlaygroundData[]
  onEdit?: (id: string, data: { title: string; description: string }) => Promise<void>
  onDelete?: (id: string) => Promise<void>
  onDuplicate?: (id: string) => Promise<void>
  onMarkasFavorite?: (id: string) => Promise<void>
  isLoading?: boolean
}

interface EditProjectData {
  title: string
  description: string
}

export default function ProjectTable({
  playgrounds,
  onEdit,
  onDelete,
  onDuplicate,
  onMarkasFavorite,
  isLoading: parentLoading = false,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<PlaygroundData | null>(null)
  const [editData, setEditData] = useState<EditProjectData>({ title: "", description: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [favoutrie, setFavourite] = useState(false)
  
  const handleEditClick = (project: PlaygroundData) => {
    setSelectedProject(project)
    setEditData({
      title: project.title,
      description: project.description || "",
    })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = async (project: PlaygroundData) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const handleUpdateProject = async () => {
    if (!selectedProject || !onEdit) return

    setIsLoading(true)
    try {
      await onEdit(selectedProject.id, editData)
      setEditDialogOpen(false)
      setSelectedProject(null)
      toast.success("Project updated successfully")
    } catch (error) {
      toast.error("Failed to update project")
      console.error("Error updating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkasFavorite = async (project: Project) => {
    if (!onMarkasFavorite) return

    setIsLoading(true)
    try {
      await onMarkasFavorite(project.id)
      toast.success("Project marked as favorite successfully")
    } catch (error) {
      toast.error("Failed to mark project as favorite")
      console.error("Error marking project as favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDelete) return

    setIsLoading(true)
    try {
      await onDelete(selectedProject.id)
      setDeleteDialogOpen(false)
      setSelectedProject(null)
      toast.success("Project deleted successfully")
    } catch (error) {
      toast.error("Failed to delete project")
      console.error("Error deleting project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDuplicateProject = async (project: PlaygroundData) => {
    if (!onDuplicate) return

    setIsLoading(true)
    try {
      await onDuplicate(project.id)
      toast.success("Project duplicated successfully")
    } catch (error) {
      toast.error("Failed to duplicate project")
      console.error("Error duplicating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyProjectUrl = (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`
    navigator.clipboard.writeText(url)
    toast.success("Project URL copied to clipboard")
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playgrounds
              .filter((project) => project && project.id && project.title) // Safety filter
              .map((project: PlaygroundData) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <Link href={`/playground/${project.id}`} className="hover:underline">
                      <span className="font-semibold">{project.title}</span>
                    </Link>
                    <span className="text-sm text-gray-500 line-clamp-1">{project.description || "No description"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-[#E93F3F15] text-[#E93F3F] border-[#E93F3F]">
                    {project.template || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {project.createdAt ? format(new Date(project.createdAt), "MMM d, yyyy") : "Unknown"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={project.user?.image || "/placeholder.svg"}
                        alt={project.user?.name || "User avatar"}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{project.user?.name || "Unknown User"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <MarkedToggleButton markedForRevision={project.Starmark?.[0]?.isMarked || false} id={project.id} />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/playground/${project.id}`} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Open Project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/playground/${project.id}`} target="_blank" className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditClick(project)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateProject(project)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyProjectUrl(project.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(project)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateProject} disabled={isLoading || !editData.title.trim()}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone. All files and
              data associated with this project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}