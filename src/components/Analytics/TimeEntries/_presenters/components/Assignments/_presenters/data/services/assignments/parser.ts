export const fromApiParser = (data: any): Assignment => {
  return {
    id: data.id,
    coverage: data.coverage,
    requirementId: data.requirement_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};
