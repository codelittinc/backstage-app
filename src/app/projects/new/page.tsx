"use client";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import ProjectForm from "../_presenters/components/ProjectForm";
import useNewProjectController from "./_presenters/controllers/useNewProjectController";
import Loading from "@/components/Loading";

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

  return <ProjectForm project={defaultProject} onSave={onSave} />;
}

export default Page;
