import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fromApiParser, toApiParser } from "./parser";
import { getRoadrunnerUrl } from "@/api";
import { REPOSITORIES_KEY } from "@/app/repositories/_domain/constants";
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

export const getRepository = async (id: string | number) => {
  const { data } = await axios.get(
    getRoadrunnerUrl(`/repositories/${id}.json`)
  );

  return fromApiParser(data);
};

export function useGetRepository(id: string | number) {
  return useQuery({
    queryKey: [REPOSITORIES_KEY, id],
    queryFn: () => getRepository(id),
  });
}
