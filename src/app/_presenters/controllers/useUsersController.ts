"use client";
import { useQuery } from "@tanstack/react-query";

import { USERS_KEY } from "@/app/_domain/constants";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";

import { getUsers } from "../data/users";

const useUsersController = () => {
  const { hasPermission } = usePermissions({
    ability: "view",
    target: "users",
  });

  const { data, isLoading } = useQuery({
    queryKey: [USERS_KEY],
    queryFn: getUsers,
    enabled: hasPermission,
  });

  return {
    users: data,
    isLoading: isLoading,
  };
};

export default useUsersController;
