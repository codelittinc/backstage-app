interface ApiCustomer {
  id?: number;
  name: string;
  notifications_token: string | undefined;
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
  };
}

export function toApiParser(customer: Customer): ApiCustomer {
  console.log("po ta to", customer);
  return {
    id: customer.id,
    name: customer.name,
    notifications_token: customer.notificationsToken,
    source_control_token: customer.sourceControlToken,
    ticket_tracking_system_token: customer.ticketTrackingSystemToken,
  };
}
