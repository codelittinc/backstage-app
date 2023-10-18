import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiProjectFrom {
  id?: number;
  name: string;
  billable: boolean;
  slack_channel: string | null;
  start_date: string | null;
  end_date: string | null;
  metadata: any | null;
  customer: Customer;
}

export interface ApiProjectTo {
  id?: number;
  name: string;
  billable: boolean;
  slack_channel: string | null;
  start_date: string | null;
  end_date: string | null;
  metadata: any | null;
  customer_id: number;
}

export function fromApiParser(project: ApiProjectFrom): Project {
  const { customer } = project;

  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slack_channel: project.slack_channel,
    start_date: project.start_date,
    end_date: project.end_date,
    metadata: project.metadata,
    customer: customerFromApiParser(customer),
  };
}

export function toApiParser(project: Project): ApiProjectTo {
  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slack_channel: project.slack_channel,
    start_date: project.start_date,
    end_date: project.end_date,
    metadata: project.metadata,
    customer_id: project.customer.id!,
  };
}
