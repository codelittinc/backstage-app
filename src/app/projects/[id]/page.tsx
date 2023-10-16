"use client";
import { useParams } from "next/navigation";
import ProjectForm from "../_presenters/components/ProjectForm";
import useNewProjectController from "./_presenters/controllers/useProjectController";
import Loading from "@/components/Loading";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";

function Page() {
  const { id } = useParams();

  const { project, isLoading, onSave } = useNewProjectController(Number(id));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TabsLayout
      tabs={["Profile", "Analytics"]}
      tabsChildren={[
        <ProjectForm project={project} onSave={onSave} />,
        <div>Analytics</div>,
      ]}
    />
  );
}

export default Page;
