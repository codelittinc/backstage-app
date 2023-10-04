import axios from "axios";
import { fromApiParser } from "./parser";
import {
  backstageApiClient,
  setAuthorizationHeader,
} from "@/app/_presenters/_data/auth/backstageApiAxios";

export const getCustomers = async (session_user: SessionUser | undefined) => {
  if (!session_user) {
    return [];
  }
  setAuthorizationHeader(session_user);
  const { data } = await await backstageApiClient.get("/customers.json");
  return data.map(fromApiParser);
};
