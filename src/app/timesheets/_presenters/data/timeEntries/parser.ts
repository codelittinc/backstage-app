import { TimeEntry } from "../../domain/types/TimeEntry";

export const fromApiParser = (data: any): TimeEntry => {
  return {
    id: data.id,
    userId: data.user_id,
    statementOfWorkId: data.statement_of_work_id,
    date: data.date,
    hours: data.hours,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const toApiParser = (data: TimeEntry): any => {
  return {
    user_id: data.userId,
    statement_of_work_id: data.statementOfWorkId,
    date: data.date,
    hours: data.hours,
  };
};
