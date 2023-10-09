export interface ApiProject {
  id?: number;
  name: string;
  customer_id: number;
}

export function fromApiParser(project: ApiProject): Project {
  return {
    id: project.id,
    name: project.name,
    customerId: project.customer_id,
  };
}

export function toApiParser(project: Project): ApiProject {
  return {
    id: project.id,
    name: project.name,
    customer_id: project.customerId,
  };
}
