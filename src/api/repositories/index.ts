import axios from "axios";
import { getUrl } from "..";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const BASE_QUERY_KEY = "repositories";

interface Repository {
  name: string;
  owner: string;
  active: boolean;
  slug: string;
}

const ROADRUNNER_URL = "https://api.roadrunner.codelitt.dev";

export const getRepositories = async (query: string) => {
  const { data } = await axios.get(`${ROADRUNNER_URL}/repositories.json`);

  return data;
};

export function useGetRepositories(query: string) {
  return useQuery({
    queryKey: [BASE_QUERY_KEY],
    queryFn: () => getRepositories(query),
  });
}
