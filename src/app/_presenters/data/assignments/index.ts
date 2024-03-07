import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { fromApiParser, toApiParser } from "./parser";

export const getAssignments = async ({
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
  const { data } = await backstageApiClient.get("/assignments.json", {
    params: {
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
      statement_of_work_id: statementOfWorkId,
    },
  });

  return data.map(fromApiParser);
};

export const getAssignment = async (assignmentId: number | string) => {
  const { data } = await backstageApiClient.get(
    `/assignments/${assignmentId}.json`
  );

  return fromApiParser(data);
};

export const createAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await backstageApiClient.post<Assignment>(
    `/assignments.json`,
    {
      assignment: toApiParser(assignment),
    }
  );

  return fromApiParser(data);
};

export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await backstageApiClient.put<Assignment>(
    `/assignments/${assignment.id}.json`,
    {
      assignment: toApiParser(assignment),
    }
  );

  return fromApiParser(data);
};

export const deleteAssignment = async (assignment: Assignment) => {
  await backstageApiClient.delete(`/assignments/${assignment.id}.json`);
};
