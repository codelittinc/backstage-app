import axios from "axios";
import { fromApiParser, toApiParser } from "./parser";
import { getRoadrunnerUrl } from "@/api";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";

export const getRepositories = async () => {
  const { data } = await axios.get(getRoadrunnerUrl("/repositories.json"));

  return data.map(fromApiParser);
};

export const saveRepository = async (params: Repository) => {
  const { id = "" } = params;

  var result = null;
  if (id) {
    result = await axios.put(getRoadrunnerUrl(`/repositories/${id}.json`), {
      repository: toApiParser(params),
    });
  } else {
    result = await axios.post(getRoadrunnerUrl(`/repositories.json`), {
      repository: toApiParser(params),
    });
  }

  const { data } = result;
  return fromApiParser(data);
};

export const getRepository = async (id: number | undefined | string) => {
  if (!id) {
    return null;
  }
  const { data } = await axios.get(
    getRoadrunnerUrl(`/repositories/${id}.json`)
  );

  return fromApiParser(data);
};
