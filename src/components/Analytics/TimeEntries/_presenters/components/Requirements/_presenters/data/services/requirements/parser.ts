export const fromApiParser = (data: any): Requirement => {
  return {
    id: data.id,
    coverage: data.coverage,
    professionId: data.profession_id,
    statementOfWorkId: data.statement_of_work_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};
