"use client";
import { useQuery } from "@tanstack/react-query";

import { USERS_KEY } from "@/app/_domain/constants";

import { getUsers } from "../data/users";

const useUsersController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [USERS_KEY],
    queryFn: getUsers,
  });

  return {
    users: data,
    isLoading: isLoading,
  };
};

export default useUsersController;
