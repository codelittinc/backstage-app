"use client";
import { useParams } from "next/navigation";

import useNewStatementsOfWorkController from "./_presenters/controllers/useNewStatementOfWorkController";
import StatementOfWorkForm from "../_presenters/components/RequirementForm";

function Page() {
  const { id } = useParams();

  const { onSave } = useNewStatementsOfWorkController(id as string);

  return <StatementOfWorkForm onSave={onSave} projectId={id as string} />;
}

export default Page;
