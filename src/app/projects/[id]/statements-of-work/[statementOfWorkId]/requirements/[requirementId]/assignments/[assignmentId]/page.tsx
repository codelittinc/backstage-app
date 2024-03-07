"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useEditStatementOfWorkController from "./_presenters/controllers/useEditAssignmentController";
import AssignmentForm from "../_presenters/components/AssignmentForm";

function Page() {
  const { requirementId, assignmentId } = useParams();

  const { onSave, requirement, assignment, isLoading } =
    useEditStatementOfWorkController(
      assignmentId as string,
      requirementId as string
    );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AssignmentForm
      requirement={requirement!}
      assignment={assignment!}
      onSave={onSave}
    />
  );
}

export default Page;
