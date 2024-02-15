import { ApiCustomer } from "@/app/customers/_presenters/data/services/customers/parser";

export type ServiceIdentifier = {
  customer: Customer;
  id?: number;
  identifier: string;
  serviceName: string;
};

export type ApiServiceIdentifier = {
  customer: ApiCustomer;
  customer_id: number;
  id?: number;
  identifier: string;
  service_name: string;
};

export type ToApiServiceIdentifier = Omit<ApiServiceIdentifier, "customer">;
