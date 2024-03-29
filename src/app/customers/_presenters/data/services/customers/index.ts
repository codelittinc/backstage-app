import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { ApiCustomer, fromApiParser, toApiParser } from "./parser";

export const getCustomers = async () => {
  const { data } = await backstageApiClient.get("/customers.json");
  return data.map(fromApiParser);
};

export const getCustomer = async (id: number | string) => {
  const { data } = await backstageApiClient.get(`/customers/${id}.json`);
  return fromApiParser(data);
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const { data } = await backstageApiClient.post<ApiCustomer>(
    `/customers.json`,
    {
      customer: toApiParser(customer),
    }
  );

  return fromApiParser(data);
};

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const { data } = await backstageApiClient.put<ApiCustomer>(
    `/customers/${customer.id}.json`,
    {
      customer: toApiParser(customer),
    }
  );

  return fromApiParser(data);
};
