import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiProjectFrom {
  billable: boolean;
  customer: Customer;
  end_date: string | null;
  id?: number;
  logo_url: string | null;
  name: string;
  participants: Participant[];
  slack_channel: string | null;
  slug: string;
  start_date: string | null;
}

export interface ApiProjectTo {
  billable: boolean;
  customer_id: number;
  end_date: string | null;
  id?: number;
  logo_url: string | null;
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
    logoUrl: project.logo_url,
    participants: project.participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      email: participant.email,
      imageUrl: participant.image_url,
      slug: participant.slug,
    })),
  };
}

export function toApiParser(project: Project): ApiProjectTo {
  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slack_channel: project.slackChannel,
    start_date: project.startDate,
    end_date: project.endDate,
    customer_id: project.customer.id!,
    logo_url: project.logoUrl,
  };
}
