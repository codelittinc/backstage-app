import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { fromApiParser, toApiParser } from "./parser";

export const getStatementOfWorks = async (projectId: string | number) => {
  const { data } = await backstageApiClient.get(
    `/projects/${projectId}/statement_of_works.json`
  );

  return data.map(fromApiParser);
};

export const getStatementOfWork = async (
  id: number | string,
  projectId: number | string
) => {
  const { data } = await backstageApiClient.get(
    `/projects/${projectId}/statement_of_works/${id}.json`
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
    `/projects/${projectId}/statement_of_works.json`,
    {
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
    `/projects/${projectId}/statement_of_works/${statementOfWork.id}.json`,
    {
      statement_of_work: toApiParser(statementOfWork),
    }
  );

  return fromApiParser(data);
};

export const deleteStatementOfWork = async ({
  projectId,
  statementOfWork,
}: {
  projectId: string | number;
  statementOfWork: StatementOfWork;
}) => {
  await backstageApiClient.delete(
    `/projects/${projectId}/statement_of_works/${statementOfWork.id}.json`
  );
};
