"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useEditStatementOfWorkController from "./_presenters/controllers/useEditAssignmentController";
import AssignmentForm from "../_presenters/components/AssignmentForm";

function Page() {
  const { requirementId, assignmentId, id: projectId } = useParams();

  const { onSave, requirement, assignment, isLoading, onDelete } =
    useEditStatementOfWorkController(
      assignmentId as string,
      requirementId as string,
      projectId as string
    );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AssignmentForm
      requirement={requirement!}
      assignment={assignment!}
      onSave={onSave}
      onDelete={onDelete}
    />
  );
}

export default Page;
