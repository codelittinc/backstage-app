"use client";
import { useParams } from "next/navigation";
import StatementOfWorkForm from "../_presenters/components/StatementOfWorkForm";
import useEditStatementOfWorkController from "./_presenters/controllers/useEditStatementOfWorkController";
import Loading from "@/components/Loading";

function Page() {
  const { id, statementOfWorkId } = useParams();

  const { onSave, statementOfWork, isLoading } =
    useEditStatementOfWorkController(statementOfWorkId as string, id as string);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <StatementOfWorkForm statementOfWork={statementOfWork!} onSave={onSave} />
  );
}

export default Page;
