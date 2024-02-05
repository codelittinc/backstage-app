export interface ApiCustomer {
  id?: number;
  name: string;
  notifications_token: string | undefined;
  slug: string;
  source_control_token: string | undefined;
  ticket_tracking_system_token: string | undefined;
}

export function fromApiParser(customer: ApiCustomer): Customer {
  return {
    id: customer.id,
    name: customer.name,
    notificationsToken: customer.notifications_token,
    sourceControlToken: customer.source_control_token,
    ticketTrackingSystemToken: customer.ticket_tracking_system_token,
    slug: customer.slug,
  };
}

export function toApiParser(customer: Customer): ApiCustomer {
  return {
    id: customer.id,
    name: customer.name,
    notifications_token: customer.notificationsToken,
    source_control_token: customer.sourceControlToken,
    ticket_tracking_system_token: customer.ticketTrackingSystemToken,
    slug: customer.slug,
  };
}
