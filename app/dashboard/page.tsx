import { getAllPlaygroundForUser } from "@/features/playground/actions";
import { DashboardClient } from "@/features/dashboard/components/dashboard-client";

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

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  
  // Filter out any invalid playground data to prevent runtime errors
  const validPlaygrounds = playgrounds?.filter((playground: any) => 
    playground && 
    playground.id && 
    playground.title && 
    playground.template &&
    playground.createdAt &&
    playground.updatedAt &&
    playground.userId
  ) || [];
  
  return (
    <DashboardClient 
      initialPlaygrounds={validPlaygrounds as PlaygroundData[]} 
    />
  );
};

export default DashboardMainPage;