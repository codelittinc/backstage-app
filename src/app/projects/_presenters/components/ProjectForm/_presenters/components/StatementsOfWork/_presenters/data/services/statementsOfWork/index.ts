import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { fromApiParser, toApiParser } from "./parser";

export const getStatementOfWorks = async (
  projectId?: string | number,
  startDate?: string,
  endDate?: string
) => {
  const { data } = await backstageApiClient.get(`/statement_of_works.json`, {
    params: {
      project_id: projectId,
      filters: {
        start_date: startDate,
        end_date: endDate,
      },
    },
  });

  return data.map(fromApiParser);
};

export const getStatementOfWork = async (
  id: number | string,
  projectId: number | string
) => {
  const { data } = await backstageApiClient.get(
    `/statement_of_works/${id}.json`,
    {
      params: {
        project_id: projectId,
      },
    }
  );

  return fromApiParser(data);
};

export const createStatementOfWork = async ({
  projectId,
  statementOfWork,
}: {
  projectId: string | number;
  statementOfWork: StatementOfWork;
}): Promise<StatementOfWork> => {
  const { data } = await backstageApiClient.post<StatementOfWork>(
    `/statement_of_works.json`,
    {
      project_id: projectId,
      statement_of_work: toApiParser(statementOfWork),
    }
  );

  return fromApiParser(data);
};

export const updateStatementOfWork = async ({
  projectId,
  statementOfWork,
}: {
  projectId: string | number;
  statementOfWork: StatementOfWork;
}): Promise<StatementOfWork> => {
  const { data } = await backstageApiClient.put<StatementOfWork>(
    `/statement_of_works/${statementOfWork.id}.json`,
    {
      project_id: projectId,
      statement_of_work: toApiParser(statementOfWork),
    }
  );

  return fromApiParser(data);
};

export const deleteStatementOfWork = async ({
  statementOfWork,
}: {
  statementOfWork: StatementOfWork;
}) => {
  await backstageApiClient.delete(
    `/statement_of_works/${statementOfWork.id}.json`
  );
};
