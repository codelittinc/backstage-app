import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { fromApiParser } from "./parser";

export const getRequirements = async ({
  projectId,
  startDate,
  endDate,
  statementOfWorkId,
}: {
  endDate: string;
  projectId?: number | string;
  startDate: string;
  statementOfWorkId?: number | string;
}) => {
  const { data } = await backstageApiClient.get("/requirements.json", {
    params: {
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
      statement_of_work_id: statementOfWorkId,
    },
  });

  return data.map(fromApiParser);
};
