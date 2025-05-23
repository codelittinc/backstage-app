import Assignment from "@/app/_domain/interfaces/Assignment";

export const fromApiParser = (data: any): Assignment => {
  return {
    id: data.id,
    coverage: data.coverage,
    requirementId: data.requirement_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    startDate: data.start_date,
    endDate: data.end_date,
    userId: data.user_id,
    statementOfWorkId: data.statement_of_work_id,
    feedback: data.feedback,
  };
};

export const toApiParser = (data: Assignment): any => {
  return {
    id: data.id,
    coverage: data.coverage,
    requirement_id: data.requirementId,
    start_date: data.startDate,
    end_date: data.endDate,
    user_id: data.userId,
    feedback: data.feedback,
  };
};
