"use server"
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db"
import { TemplateFolder } from "../libs/path-to-json";
import { revalidatePath } from "next/cache";

// Define valid template types
type ValidTemplate = 
  | "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"
  | "ASTRO" | "TYPESCRIPT" | "JAVASCRIPT" | "NODE" | "BOOTSTRAP" 
  | "GRAPHQL" | "NUXT" | "SVELTE" | "QUASAR" | "KOA" | "VITE" 
  | "EXPO" | "QWIK" | "GSAP_REACT" | "GSAP_NEXT" | "GSAP_NUXT" 
  | "GSAP_SVELTE" | "GSAP_SVELTEKIT" | "GSAP_VUE" | "SVELTEKIT" 
  | "STATIC" | "JSON_SERVER" | "JSON_GRAPHQL" | "SLIDEV" 
  | "TUTORIALKIT" | "TRES" | "BOLT_VITE_REACT" | "BOLT_EXPO" 
  | "BOLT_QWIK" | "BOLT_REMOTION" | "RXJS" | "NODEMON" | "EGG" | "TEST" | "GITHUB_IMPORT";


export const createPlaygroundFromGitHub = async (data: {
  title: string;
  description?: string;
  templateData: TemplateFolder;
}) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    // Create the playground
    const playground = await db.playground.create({
      data: {
        title: data.title,
        description: data.description,
        template: "GITHUB_IMPORT" as any,
        userId: user.id,
      },
    });

    // Create the template file with the GitHub data
    await db.templateFile.create({
      data: {
        playgroundId: playground.id,
        content: JSON.stringify(data.templateData),
      },
    });

    revalidatePath("/dashboard");
    return playground;
  } catch (error) {
    console.error("Error creating playground from GitHub:", error);
    throw new Error("Failed to create playground from GitHub repository");
  }
};


// Toggle marked status for a problem
export const toggleStarMarked = async (playgroundId: string, isChecked: boolean) => {
    const user = await currentUser();
    const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    if (isChecked) {
      await db.starMark.create({
        data: {
          userId: userId!,
          playgroundId,
          isMarked: isChecked,
        },
      });
    } else {
      await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId,

          },
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true, isMarked: isChecked };
  } catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};
export const createPlayground = async (data:{
    title: string;
    template: ValidTemplate;
    description?: string;
  })=>{
    const {template , title , description} = data;

    const user = await currentUser();
    try {
        const playground = await db.playground.create({
            data:{
                title:title,
                description:description,
                template:template as any, // Type assertion for enum compatibility
                userId:user?.id!
            }
        })

        return playground;
    } catch (error) {
        console.log(error)
    }
}


export const getAllPlaygroundForUser = async ()=>{
    const user = await currentUser();
    try {
        const user  = await currentUser();
        const playground = await db.playground.findMany({
            where:{
                userId:user?.id!
            },
            include:{
                user:true,
                Starmark:{
                    where:{
                        userId:user?.id!
                    },
                    select:{
                        isMarked:true
                    }
                }
            }
        })
      
        return playground;
    } catch (error) {
        console.log(error)
    }
}

export const getPlaygroundById = async (id:string)=>{
    try {
        const playground = await db.playground.findUnique({
            where:{id},
            select:{
              templateFiles:{
                select:{
                  content:true
                }
              }
            }
        })
        return playground;
    } catch (error) {
        console.log(error)
    }
}

export const SaveUpdatedCode = async (playgroundId: string, data: TemplateFolder) => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const updatedPlayground = await db.templateFile.upsert({
      where: {
        playgroundId, // now allowed since playgroundId is unique
      },
      update: {
        content: JSON.stringify(data),
      },
      create: {
        playgroundId,
        content: JSON.stringify(data),
      },
    });

    return updatedPlayground;
  } catch (error) {
    console.log("SaveUpdatedCode error:", error);
    return null;
  }
};

export const deleteProjectById = async (id:string)=>{
    try {
        await db.playground.delete({
            where:{id}
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
}


export const editProjectById = async (id:string,data:{title:string , description:string})=>{
    try {
        await db.playground.update({
            where:{id},
            data:data
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
}

export const duplicateProjectById = async (id: string) => {
    try {
        // Fetch the original playground data
        const originalPlayground = await db.playground.findUnique({
            where: { id },
            include: {
                templateFiles: true, // Include related template files
            },
        });

        if (!originalPlayground) {
            throw new Error("Original playground not found");
        }

        // Create a new playground with the same data but a new ID
        const duplicatedPlayground = await db.playground.create({
            data: {
                title: `${originalPlayground.title} (Copy)`,
                description: originalPlayground.description,
                template: originalPlayground.template,
                userId: originalPlayground.userId,
                templateFiles: {
                  // @ts-ignore
                    create: originalPlayground.templateFiles.map((file) => ({
                        content: file.content,
                    })),
                },
            },
        });

        // Revalidate the dashboard path to reflect the changes
        revalidatePath("/dashboard");

        return duplicatedPlayground;
    } catch (error) {
        console.error("Error duplicating project:", error);
    }
};