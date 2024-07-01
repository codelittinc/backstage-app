import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import { getProject } from "@/app/projects/_presenters/data/services/projects";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useReportsController = () => {
  const params = useSearchParams();
  const authKey = params.get("authKey") as string;

  const { setProjectAuthKey, projectAuthKey } = useAppStore();
  const [selectedStatementOfWork, selectStatementOfWork] = useState<
    StatementOfWork | undefined
  >(undefined);

  const { data: project, isLoading } = useQuery({
    queryKey: [tanstackKeys.Projects, authKey],
    queryFn: () => getProject(authKey),
    enabled: !!projectAuthKey,
  });

  const { data: statementsOfWork, isLoading: isLoadingStatementOfWorks } =
    useQuery({
      queryKey: [tanstackKeys.StatementsOfWork, project?.id],
      queryFn: () => getStatementOfWorks(project?.id),
      enabled: !!project?.id,
    });

  useEffect(() => {
    if (authKey) {
      setProjectAuthKey(authKey as string);
    }
  }, [authKey]);

  useEffect(() => {
    if (!selectedStatementOfWork && statementsOfWork?.length > 0) {
      selectStatementOfWork(statementsOfWork[0]);
    }
  }, [statementsOfWork]);

  return {
    project,
    isLoading: isLoading && isLoadingStatementOfWorks,
    statementsOfWork,
    selectedStatementOfWork,
    selectStatementOfWork,
  };
};

export default useReportsController;
