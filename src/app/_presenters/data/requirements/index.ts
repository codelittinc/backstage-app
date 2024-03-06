import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { fromApiParser, toApiParser } from "./parser";

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

export const getRequirement = async (requirementId: number | string) => {
  const { data } = await backstageApiClient.get(
    `/requirements/${requirementId}.json`
  );

  return fromApiParser(data);
};

export const createRequirement = async (
  requirement: Requirement
): Promise<Requirement> => {
  const { data } = await backstageApiClient.post<Requirement>(
    `/requirements.json`,
    {
      requirement: toApiParser(requirement),
    }
  );

  return fromApiParser(data);
};

export const updateRequirement = async (
  requirement: Requirement
): Promise<Requirement> => {
  const { data } = await backstageApiClient.put<Requirement>(
    `/requirements/${requirement.id}.json`,
    {
      requirement: toApiParser(requirement),
    }
  );

  return fromApiParser(data);
};

export const deleteStatementOfWork = async (requirement: Requirement) => {
  await backstageApiClient.delete(`/requirements/${requirement.id}.json`);
};
