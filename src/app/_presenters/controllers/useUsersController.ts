"use client";
import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getUsers } from "../data/users";

const useUsersController = (
  onlyActive = true,
  onlyInternal = false,
  onlyRehireable = false,
  professionIds: number[] = []
) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.Applications,
      onlyActive,
      onlyInternal,
      onlyRehireable,
      professionIds,
    ],
    queryFn: () =>
      getUsers(onlyActive, onlyInternal, "", onlyRehireable, professionIds),
  });

  return {
    users: data ?? [],
    isLoading: isLoading,
  };
};

export default useUsersController;
