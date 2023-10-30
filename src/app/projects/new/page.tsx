"use client";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Loading from "@/components/Loading";

import useNewProjectController from "./_presenters/controllers/useNewProjectController";
import ProjectForm from "../_presenters/components/ProjectForm";


function Page() {
  const { customers, isLoading } = useCustomersController();
  const { onSave } = useNewProjectController();
  if (isLoading) {
    return <Loading />;
  }

  const defaultProject = {
    name: "",
    customer: customers[0],
  };

  return (
    <DashboardLayout>
      <ProjectForm project={defaultProject} onSave={onSave} />
    </DashboardLayout>
  );
}

export default Page;
