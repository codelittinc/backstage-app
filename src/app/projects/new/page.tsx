"use client";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Loading from "@/components/Loading";

import useNewProjectController from "./_presenters/controllers/useNewProjectController";
import ProjectForm from "../_presenters/components/ProjectForm";

function Page() {
  const { onSave } = useNewProjectController();

  return (
    <DashboardLayout>
      <ProjectForm onSave={onSave} />
    </DashboardLayout>
  );
}

export default Page;
