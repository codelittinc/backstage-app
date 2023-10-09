"use client";
import { useParams } from "next/navigation";
import ProjectForm from "../_presenters/components/ProjectForm";
import useNewProjectController from "./_presenters/controllers/useProjectController";
import Loading from "@/components/Loading";

function Page() {
  const { id } = useParams();

  const { project, isLoading, onSave } = useNewProjectController(Number(id));

  if (isLoading) {
    return <Loading />;
  }
  return <ProjectForm project={project} onSave={onSave} />;
}

export default Page;
