import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { fromApiParser, toApiParser } from "./parser";
import { TimeEntry } from "../../domain/types/TimeEntry";

export const getTimeEntries = async ({
  startDate,
  endDate,
  statementOfWorkIds,
}: {
  endDate: string;
  startDate: string;
  statementOfWorkIds?: number | string;
}) => {
  const { data } = await backstageApiClient.get("/time_entries.json", {
    params: {
      filters: {
        start_date: startDate,
        end_date: endDate,
        statement_of_work_ids: statementOfWorkIds,
      },
    },
  });

  return data.map(fromApiParser);
};

export const createTimeEntry = async (
  timeEntry: TimeEntry
): Promise<TimeEntry> => {
  const { data } = await backstageApiClient.post<TimeEntry>(
    `/time_entries.json`,
    {
      time_entry: toApiParser(timeEntry),
    }
  );

  return fromApiParser(data);
};

export const updateTimeEntry = async (
  timeEntry: TimeEntry
): Promise<TimeEntry> => {
  const { data } = await backstageApiClient.put<TimeEntry>(
    `/time_entries/${timeEntry.id}.json`,
    {
      time_entry: toApiParser(timeEntry),
    }
  );

  return fromApiParser(data);
};

export const deleteTimeEntry = async (timeEntry: TimeEntry) => {
  await backstageApiClient.delete(`/time_entries/${timeEntry.id}.json`);
};
