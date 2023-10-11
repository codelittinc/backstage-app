interface ApiCustomer {
  id?: number;
  name: string;
  notifications_token: string;
  source_control_token: string;
}

export function fromApiParser(customer: ApiCustomer): Customer {
  return {
    id: customer.id,
    name: customer.name,
    notificationsToken: customer.notifications_token,
    sourceControlToken: customer.source_control_token,
  };
}

export function toApiParser(customer: Customer): ApiCustomer {
  return {
    id: customer.id,
    name: customer.name,
    notifications_token: customer.notificationsToken,
    source_control_token: customer.sourceControlToken,
  };
}
