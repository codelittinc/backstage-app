import { ApiUser, User } from "@/app/_domain/interfaces/User";

import { fromApiParser, toApiParser } from "./parser";
import { backstageApiClient } from "../auth/backstageApiAxios";

export const getAuthenticatedUser = async (): Promise<User> => {
  const { data } = await backstageApiClient.get("/users/me.json");
  return fromApiParser(data);
};

export const getUser = async (id: number | string): Promise<User> => {
  const { data } = await backstageApiClient.get(`/users/${id}.json`);
  return fromApiParser(data);
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await backstageApiClient.get(`/users.json`);
  return data.map(fromApiParser);
};

export const updateUser = async (user: User): Promise<User> => {
  const { data } = await backstageApiClient.put<ApiUser>(
    `/users/${user.id}.json`,
    {
      user: toApiParser(user),
    }
  );

  return fromApiParser(data);
};

export const createUser = async (user: User): Promise<User> => {
  const { data } = await backstageApiClient.post<ApiUser>(`/users.json`, {
    user: toApiParser(user),
  });

  return fromApiParser(data);
};
