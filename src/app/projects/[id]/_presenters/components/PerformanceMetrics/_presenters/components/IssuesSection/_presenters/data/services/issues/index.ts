import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";
import Issue from "../../../domain/interfaces/issue";
import { fromApiParser } from "./parser";

export const getIssues = async (
  project: Project,
  closed: boolean,
  startDateFilter?: string,
  endDateFilter?: string
): Promise<Issue[]> => {
  const { data } = await backstageApiClient.get("/issues.json", {
    params: {
      project_id: project.id,
      start_date: startDateFilter,
      end_date: endDateFilter,
      closed,
    },
  });

  return data.map(fromApiParser);
};
