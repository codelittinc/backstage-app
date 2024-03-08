"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useNewStatementsOfWorkController from "./_presenters/controllers/useNewRequirementController";
import RequirementForm from "../_presenters/components/RequirementForm";

function Page() {
  const { id, statementOfWorkId } = useParams();

  const { onSave, statementOfWork, isLoading } =
    useNewStatementsOfWorkController(statementOfWorkId as string, id as string);

  if (isLoading) {
    return <Loading />;
  }

  return <RequirementForm onSave={onSave} statementOfWork={statementOfWork!} />;
}

export default Page;
