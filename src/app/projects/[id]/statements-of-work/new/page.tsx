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
    hourDeliverySchedule: "contract_period",
    model: "time_and_materials",
    hourlyRevenue: 0,
    totalRevenue: 0,
    limitByDeliverySchedule: true,
    totalHours: 0,
    projectId: id as string,
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
