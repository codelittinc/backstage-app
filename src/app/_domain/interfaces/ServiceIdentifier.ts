export type ServiceIdentifier = {
  customer: Customer;
  id?: number;
  identifier: string;
  serviceName: string;
};

export type ApiServiceIdentifier = {
  customer: Customer;
  customer_id: number;
  id?: number;
  identifier: string;
  service_name: string;
};
