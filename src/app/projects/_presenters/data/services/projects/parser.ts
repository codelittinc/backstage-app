import {
  ApiCustomer,
  fromApiParser as customerFromApiParser,
} from "@/app/customers/_presenters/data/services/customers/parser";

export interface ApiProjectFrom {
  billable: boolean;
  customer: ApiCustomer;
  id?: number;
  logo_background_color?: string;
  logo_url?: string;
  name: string;
  participants: Participant[];
  slack_channel?: string;
  slug: string;
  sync_source_control: boolean;
  sync_ticket_tracking_system: boolean;
  display_code_metrics: boolean;
  display_tasks_metrics: boolean;
}

export interface ApiProjectTo {
  billable: boolean;
  customer_id: number;
  id?: number;
  logo_background_color?: string;
  logo_url?: string;
  name: string;
  slack_channel?: string;
  sync_source_control: boolean;
  sync_ticket_tracking_system: boolean;
  display_code_metrics: boolean;
  display_tasks_metrics: boolean;
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
    displayCodeMetrics: project.display_code_metrics,
    displayTasksMetrics: project.display_tasks_metrics,
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
    sync_source_control: project.syncSourceControl,
    sync_ticket_tracking_system: project.syncTicketTrackingSystem,
    display_code_metrics: project.displayCodeMetrics,
    display_tasks_metrics: project.displayTasksMetrics,
  };
}
