import { useQueries, useQuery } from "@tanstack/react-query";
import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getAssignments } from "@/app/_presenters/data/assignments";
import { getRequirements } from "@/app/_presenters/data/requirements";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import { User } from "@/app/_domain/interfaces/User";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

type ProjectHistoryItem = {
  id?: number;
  customer: string;
  projectName: string;
  startDate: string;
  endDate: string;
  coverage: number;
  role: string;
};

type UserProfile = {
  fullName: string;
  email: string;
  country: string;
  contractType: string;
  seniority: string;
  internal: boolean;
  active: boolean;
  professionId?: number;
};

const useUserHistoryController = (user: User) => {
  // Set fixed date range from Jan 1, 2020 to end of today
  const startDate = "2020-01-01T00:00:00.000Z";
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const endDate = today.toISOString();

  // First, get all statements of work
  const { data: statementsOfWork, isLoading: isLoadingSOWs } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, startDate, endDate],
    queryFn: () => getStatementOfWorks(undefined, startDate, endDate),
  });

  // Then, get requirements for each statement of work
  const requirementQueries = useQueries({
    queries: (statementsOfWork || []).map((sow: StatementOfWork) => ({
      queryKey: [tanstackKeys.Requirements, sow.id, startDate, endDate],
      queryFn: () =>
        getRequirements({
          startDate,
          endDate,
          statementOfWorkId: sow.id,
        }) as Promise<Requirement[]>,
      enabled: !!sow.id,
    })),
  });

  const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
    queryKey: [tanstackKeys.Assignments, user.id, startDate, endDate],
    queryFn: () =>
      getAssignments({
        startDate,
        endDate,
        statementOfWorkIds:
          statementsOfWork?.map((sow: StatementOfWork) => sow.id as number) ||
          [],
        projectId: undefined,
      }),
    enabled: !!statementsOfWork,
  });

  const projects = useProjectsController(startDate, endDate).projects;
  const isLoadingRequirements = requirementQueries.some(
    (query) => query.isLoading
  );
  const allRequirements = requirementQueries
    .map((query) => (query.data as Requirement[]) || [])
    .flat();

  // Combine assignments with their requirements and statements of work
  const projectHistory: ProjectHistoryItem[] = (
    assignments?.map((assignment: Assignment) => {
      if (assignment.userId !== user.id) {
        return null;
      }

      const requirement = allRequirements.find(
        (req: Requirement) => req.id === assignment.requirementId
      );

      console.log("requirement", requirement);
      const statementOfWork = statementsOfWork?.find(
        (sow: StatementOfWork) => sow.id === assignment.statementOfWorkId
      );

      console.log("statementOfWork", statementOfWork);

      const project = projects.find(
        (project: Project) => project.id === statementOfWork.projectId
      );

      debugger;
      console.log("project", project);

      debugger;
      return {
        id: assignment.id,
        customer: project?.customer?.name || "N/A",
        projectName: project?.name || "N/A",
        startDate: assignment.startDate,
        endDate: assignment.endDate,
        coverage: assignment.coverage,
      };
    }) || []
  ).filter(Boolean);

  // Sort project history by start date, most recent first (descending order)
  projectHistory.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  const userProfile: UserProfile = {
    fullName: user.fullName || "N/A",
    email: user.email || "N/A",
    country: user.country || "N/A",
    contractType: user.contractType || "N/A",
    seniority: user.seniority || "N/A",
    internal: user.internal,
    active: user.active || false,
    professionId: user.professionId,
  };

  // Sort user skills by years of experience in descending order
  const sortedUserSkills = [...(user.userSkills || [])].sort(
    (a, b) => b.yearsOfExperience - a.yearsOfExperience
  );

  return {
    userProfile,
    projectHistory,
    userSkills: sortedUserSkills,
    isLoading: isLoadingAssignments || isLoadingRequirements || isLoadingSOWs,
  };
};

export default useUserHistoryController;
