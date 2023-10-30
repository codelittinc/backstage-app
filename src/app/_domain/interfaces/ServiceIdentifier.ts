export type ServiceIdentifier = {
  customer: Customer;
  id?: number;
  identifier: string;
  serviceName: string;
};

export type ApiServiceIdentifier = {
  customer_id: number;
  customer: Customer;
  id?: number;
  identifier: string;
  service_name: string;
};
