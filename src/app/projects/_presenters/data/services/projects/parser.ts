import { fromApiParser as customerFromApiParser } from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiProjectFrom {
  billable: boolean;
  customer: Customer;
  id?: number;
  logo_background_color: string | null;
  logo_url: string | null;
  name: string;
  participants: Participant[];
  slack_channel: string | null;
  slug: string;
  sync_source_control: boolean;
  sync_ticket_tracking_system: boolean;
}

export interface ApiProjectTo {
  billable: boolean;
  customer_id: number;
  id?: number;
  logo_background_color: string | null;
  logo_url: string | null;
  name: string;
  slack_channel: string | null;
}

export function fromApiParser(project: ApiProjectFrom): Project {
  const { customer } = project;

  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slackChannel: project.slack_channel,
    slug: project.slug,
    customer: customerFromApiParser(customer),
    logoUrl: project.logo_url,
    logoBackgroundColor: project.logo_background_color,
    participants: project.participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      email: participant.email,
      imageUrl: participant.image_url,
      slug: participant.slug,
    })),
    syncSourceControl: project.sync_source_control,
    syncTicketTrackingSystem: project.sync_ticket_tracking_system,
  };
}

export function toApiParser(project: Project): ApiProjectTo {
  return {
    id: project.id,
    name: project.name,
    billable: project.billable,
    slack_channel: project.slackChannel,
    customer_id: project.customer.id!,
    logo_url: project.logoUrl,
    logo_background_color: project.logoBackgroundColor,
  };
}
