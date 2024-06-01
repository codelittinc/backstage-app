"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useEditStatementOfWorkController from "./_presenters/controllers/useEditRequirementController";
import RequirementForm from "../_presenters/components/RequirementForm";

function Page() {
  const { requirementId, statementOfWorkId, id: projectId } = useParams();

  const { onSave, requirement, isLoading, statementOfWork, onDelete } =
    useEditStatementOfWorkController(
      requirementId as string,
      statementOfWorkId as string,
      projectId as string
    );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <RequirementForm
      requirement={requirement}
      statementOfWork={statementOfWork!}
      onSave={onSave}
      onDelete={onDelete}
    />
  );
}

export default Page;
