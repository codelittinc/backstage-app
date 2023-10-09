"use client";
import ProjectForm from "../_presenters/components/ProjectForm";
import useNewProjectController from "./_presenters/controllers/useNewProjectController";

function Page() {
  const defaultProject = {
    id: undefined,
    name: "",
    customer_id: undefined,
  };

  const { onSave } = useNewProjectController();

  return <ProjectForm project={defaultProject} onSave={onSave} />;
}

export default Page;
