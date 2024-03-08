"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useNewAssignmentController from "./_presenters/controllers/useNewRequirementController";
import AssignmentForm from "../_presenters/components/AssignmentForm";

function Page() {
  const { id, requirementId, statementOfWorkId } = useParams();

  const { onSave, requirement, isLoading } = useNewAssignmentController(
    requirementId as string,
    statementOfWorkId as string,
    id as string
  );

  if (isLoading) {
    return <Loading />;
  }

  return <AssignmentForm onSave={onSave} requirement={requirement!} />;
}

export default Page;
