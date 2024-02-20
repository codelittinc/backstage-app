"use client";
import { useParams } from "next/navigation";

import Loading from "@/components/Loading";

import useEditStatementOfWorkController from "./_presenters/controllers/useEditStatementOfWorkController";
import StatementOfWorkForm from "../_presenters/components/StatementOfWorkForm";

function Page() {
  const { id, statementOfWorkId } = useParams();

  const { onSave, statementOfWork, isLoading } =
    useEditStatementOfWorkController(statementOfWorkId as string, id as string);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StatementOfWorkForm
      statementOfWork={statementOfWork!}
      projectId={id as string}
      onSave={onSave}
    />
  );
}

export default Page;
