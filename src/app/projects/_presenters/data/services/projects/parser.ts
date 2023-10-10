import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiProjectFrom {
  id?: number;
  name: string;
  customer: Customer;
}

export interface ApiProjectTo {
  id?: number;
  name: string;
  customer_id: number;
}

export function fromApiParser(project: ApiProjectFrom): Project {
  const { customer } = project;
  return {
    id: project.id,
    name: project.name,
    customer: customerFromApiParser(customer),
  };
}

export function toApiParser(project: Project): ApiProjectTo {
  return {
    id: project.id,
    name: project.name,
    customer_id: project.customer.id!,
  };
}
