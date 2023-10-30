import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiProjectFrom {
  billable: boolean;
  customer: Customer;
  end_date: string | null;
  id?: number;
  name: string;
  slack_channel: string | null;
  slug: string;
  start_date: string | null;
}

export interface ApiProjectTo {
  billable: boolean;
  customer_id: number;
  end_date: string | null;
  id?: number;
  name: string;
  slack_channel: string | null;
  start_date: string | null;
}

export function fromApiParser(project: ApiProjectFrom): Project {
  const { customer } = project;

  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slackChannel: project.slack_channel,
    startDate: project.start_date,
    endDate: project.end_date,
    slug: project.slug,
    customer: customerFromApiParser(customer),
  };
}

export function toApiParser(project: Project): ApiProjectTo {
  const metadata = project.metadata;
  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slack_channel: project.slackChannel,
    start_date: project.startDate,
    end_date: project.endDate,
    customer_id: project.customer.id!,
  };
}
