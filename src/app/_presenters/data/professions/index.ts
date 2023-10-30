import Profession from "@/app/_domain/interfaces/Profession";

import { fromApiParser } from "./parser";
import { backstageApiClient } from "../auth/backstageApiAxios";

export const getProfessions = async (): Promise<Profession[] | null> => {
  const { data } = await backstageApiClient.get("/professions");
  return data.map(fromApiParser);
};
