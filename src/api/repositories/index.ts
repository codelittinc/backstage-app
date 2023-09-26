import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getRoadrunnerUrl } from "..";
import { fromApiParser, toApiParser } from "./parser";
import { Application } from "../applications";

export const REPOSITORIES_KEY = "repositories";

export interface Repository {
  id: number;
  name: string;
  owner: string;
  active: boolean;
  slug: string;
  sourceControlType: string;
  baseBranch: string;
  supportsDeploy: boolean;
  applications?: Application[];
  slackRepositoryInfo: {
    id?: number;
    devChannel: string;
    deployChannel: string;
    feedChannel: string;
    devGroup: string;
  };
}

export const getRepositories = async (query: string) => {
  const { data } = await axios.get(getRoadrunnerUrl("/repositories.json"));

  return data.map(fromApiParser);
};

export const updateRepository = async (params: Repository) => {
  const { data } = await axios.put(
    getRoadrunnerUrl(`/repositories/${params.id}.json`),
    {
      repository: toApiParser(params),
    }
  );

  return fromApiParser(data);
};

export const getRepository = async (id: string | number) => {
  const { data } = await axios.get(
    getRoadrunnerUrl(`/repositories/${id}.json`)
  );

  return fromApiParser(data);
};

export function useGetRepositories(query: string) {
  return useQuery({
    queryKey: [REPOSITORIES_KEY],
    queryFn: () => getRepositories(query),
  });
}

export function useGetRepository(id: string | number) {
  return useQuery({
    queryKey: [REPOSITORIES_KEY, id],
    queryFn: () => getRepository(id),
  });
}
