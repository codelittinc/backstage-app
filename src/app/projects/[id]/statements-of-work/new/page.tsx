"use client";
import { useParams } from "next/navigation";

import useNewStatementsOfWorkController from "./_presenters/controllers/useNewStatementOfWorkController";
import StatementOfWorkForm from "../_presenters/components/StatementOfWorkForm";

function Page() {
  const { id } = useParams();

  const defaultStatementOfWork = {
    id: undefined,
    endDate: "",
    startDate: "",
    hourlyRevenue: 0,
    totalRevenue: 0,
    projectId: id as string,
    name: "",
    contractModel: {
      id: undefined,
      contractModelType: "TimeAndMaterialsContractModel",
    },
  };

  const { onSave } = useNewStatementsOfWorkController(id as string);

  return (
    <StatementOfWorkForm
      statementOfWork={defaultStatementOfWork}
      onSave={onSave}
    />
  );
}

export default Page;
