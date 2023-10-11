import Profession from "@/app/_domain/interfaces/Profession";
import { backstageApiClient } from "../auth/backstageApiAxios";
import { fromApiParser } from "./parser";

export const getProfessions = async (): Promise<Profession[] | null> => {
  const { data } = await backstageApiClient.get("/professions");
  return data.map(fromApiParser);
};
