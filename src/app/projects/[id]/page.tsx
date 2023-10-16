"use client";
import { useParams } from "next/navigation";
import ProjectForm from "../_presenters/components/ProjectForm";
import useNewProjectController from "./_presenters/controllers/useProjectController";
import Loading from "@/components/Loading";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import Analytics from "./_presenters/components/Analytics";

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
        <ProjectForm
          project={project!}
          onSave={onSave}
          key={"profile-component"}
        />,
        <Analytics project={project!} key={"analytics-component"} />,
      ]}
    />
  );
}

export default Page;
