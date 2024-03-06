export const fromApiParser = (data: any): Requirement => {
  return {
    id: data.id,
    coverage: data.coverage,
    professionId: data.profession_id,
    statementOfWorkId: data.statement_of_work_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    startDate: data.start_date,
    endDate: data.end_date,
  };
};

export const toApiParser = (data: Requirement): any => {
  return {
    id: data.id,
    coverage: data.coverage,
    profession_id: data.professionId,
    statement_of_work_id: data.statementOfWorkId,
    start_date: data.startDate,
    end_date: data.endDate,
  };
};
