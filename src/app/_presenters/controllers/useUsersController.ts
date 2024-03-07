"use client";
import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";

import { getUsers } from "../data/users";

const useUsersController = (onlyActive = true, onlyInternal = false) => {
  const { hasPermission } = usePermissions({
    ability: "view",
    target: "users",
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Applications, onlyActive, onlyInternal],
    queryFn: () => getUsers(onlyActive, onlyInternal),
    enabled: hasPermission,
  });

  return {
    users: data ?? [],
    isLoading: isLoading,
  };
};

export default useUsersController;
