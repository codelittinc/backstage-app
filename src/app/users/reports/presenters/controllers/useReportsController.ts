import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getUsers } from "@/app/_presenters/data/users";
import { getUserSkills } from "@/app/_presenters/data/userSkills";

const useReportsController = () => {
  const params = useSearchParams();
  const authKey = params.get("authKey") as string;

  const { setProjectAuthKey, projectAuthKey } = useAppStore();
  const [query, setQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: [tanstackKeys.Users, authKey],
    queryFn: () => getUsers(true, false, query),
    enabled: !!projectAuthKey,
    retry: false,
  });

  const { data: userSkills } = useQuery({
    queryKey: [tanstackKeys.UserSkills, selectedUser],
    queryFn: () => getUserSkills(selectedUser!),
    enabled: !!selectedUser,
    retry: false,
  });

  const onSearch = () => {
    setSelectedUser(null);
    refetch();
  }

  const onExpand = (userId: string | null) => {
    setSelectedUser(userId);
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  }

  useEffect(() => {
    if (authKey) {
      setProjectAuthKey(authKey as string);
    }
  }, [authKey]);

  return {
    users,
    isLoading,
    query,
    setQuery,
    onSearch,
    userSkills,
    onExpand,
    selectedUser,
    onKeyPress
  };
};

export default useReportsController;
