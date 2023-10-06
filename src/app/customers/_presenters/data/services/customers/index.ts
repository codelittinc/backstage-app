import { useSession } from "next-auth/react";
import { fromApiParser, toApiParser } from "./parser";
import {
  backstageApiClient,
  setAuthorizationHeader,
} from "@/app/_presenters/data/auth/backstageApiAxios";

export const getCustomers = async (session_user: SessionUser | undefined) => {
  if (!session_user) {
    return [];
  }
  setAuthorizationHeader(session_user);
  const { data } = await backstageApiClient.get("/customers.json");
  return data.map(fromApiParser);
};

export const getCustomer = async (
  session_user: SessionUser | undefined,
  id: number
) => {
  if (!session_user) {
    return null;
  }
  setAuthorizationHeader(session_user);
  const { data } = await backstageApiClient.get(`/customers/${id}.json`);
  return data;
};

export const createCustomer = async ({
  user_session,
  customer,
}: {
  user_session: SessionUser;
  customer: Customer;
}): Promise<Customer> => {
  setAuthorizationHeader(user_session);

  const { data } = await backstageApiClient.post<Customer>(`/customers.json`, {
    customer: toApiParser(customer),
  });

  return fromApiParser(data);
};

export const updateCustomer = async ({
  user_session,
  customer,
}: {
  user_session: SessionUser;
  customer: Customer;
}): Promise<Customer> => {
  setAuthorizationHeader(user_session);

  const { data } = await backstageApiClient.put<Customer>(
    `/customers/${customer.id}.json`,
    {
      customer: toApiParser(customer),
    }
  );

  return fromApiParser(data);
};
