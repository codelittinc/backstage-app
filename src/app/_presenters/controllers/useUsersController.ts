"use client";
import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getUsers } from "../data/users";

const useUsersController = (onlyActive = true, onlyInternal = false) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Applications, onlyActive, onlyInternal],
    queryFn: () => getUsers(onlyActive, onlyInternal),
  });

  return {
    users: data ?? [],
    isLoading: isLoading,
  };
};

export default useUsersController;
