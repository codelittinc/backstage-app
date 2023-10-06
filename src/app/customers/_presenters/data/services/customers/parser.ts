interface ApiCustomer {
  id?: number;
  name: string;
}

export function fromApiParser(customer: ApiCustomer): Customer {
  return {
    id: customer.id,
    name: customer.name,
  };
}

export function toApiParser(customer: Customer): ApiCustomer {
  return {
    id: customer.id,
    name: customer.name,
  };
}
