"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import tanstackKeys from "../_domain/enums/tanstackKeys";
import { getProject } from "../projects/_presenters/data/services/projects";
import TimeEntries from "@/components/Analytics/TimeEntries";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useAppStore } from "../_presenters/data/store/store";
import { DEFAULT_STATEMENT_OF_WORK } from "@/components/PageFilters/StatementOfWorkFilter";

const ProjectDashboard = () => {
  const params = useSearchParams();
  const authKey = params.get("authKey") as string;

  const { setProjectAuthKey, projectAuthKey } = useAppStore();

  const { data: project, isLoading } = useQuery({
    queryKey: [tanstackKeys.Projects, authKey],
    queryFn: () => getProject(authKey),
    enabled: !!projectAuthKey,
  });

  useEffect(() => {
    if (authKey) {
      setProjectAuthKey(authKey as string);
    }
  }, [authKey]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TimeEntries
      project={project}
      defaultStatementOfWork={DEFAULT_STATEMENT_OF_WORK}
    />
  );
};

export default ProjectDashboard;
