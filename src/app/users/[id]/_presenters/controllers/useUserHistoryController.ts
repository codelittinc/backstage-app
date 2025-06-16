import { useState, useCallback } from "react";
import {
  useQueries,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getAssignments } from "@/app/_presenters/data/assignments";
import { getRequirements } from "@/app/_presenters/data/requirements";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import { User } from "@/app/_domain/interfaces/User";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import Assignment from "@/app/_domain/interfaces/Assignment";
import { Requirement } from "@/app/_domain/interfaces/Requirement";
import { Project } from "@/app/_domain/interfaces/Project";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";
import { getUser, updateUser } from "@/app/_presenters/data/users";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { ApiError } from "@/providers/query.provider";

type ProjectHistoryItem = {
  id?: number;
  customer: string;
  projectName: string;
  startDate: string;
  endDate: string;
  coverage: string;
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

export type UseUserHistoryControllerProps = User;

type UseUserHistoryControllerReturn = {
  user: User;
  isEditing: boolean;
  isLoading: boolean;
  userProfile: {
    fullName: string;
    email: string;
    country: string;
    contractType?: string;
    seniority?: string;
    internal: boolean;
    active: boolean;
  };
  projectHistory: Array<{
    customer: string;
    projectName: string;
    startDate: string;
    endDate: string;
    coverage: string;
  }>;
  userSkills: Array<{
    skill: {
      name: string;
    };
    level: string;
    yearsOfExperience: number;
  }>;
  startEditing: () => void;
  stopEditing: () => void;
  handleUserUpdate: (updatedUser: User) => void;
  refreshUser: () => Promise<void>;
};

const useUserHistoryController = (
  initialUser: UseUserHistoryControllerProps
): UseUserHistoryControllerReturn => {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (result) => {
      showSaveSuccessAlert();
      setUser(result);
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Users, result.id],
      });
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "response" in error) {
        showSaveErrorAlert(error as ApiError);
      } else {
        showSaveErrorAlert({ unknownError: ["An unknown error occurred"] });
      }
    },
  });

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleUserUpdate = useCallback(
    async (updatedUser: User) => {
      try {
        await mutation.mutateAsync(updatedUser);
      } catch (error) {
        // Error is handled by mutation's onError
        console.error("Error updating user:", error);
      }
    },
    [mutation]
  );

  const refreshUser = useCallback(async () => {
    if (!user.id) return;

    try {
      setIsLoading(true);
      const updatedUser = await getUser(user.id);
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

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

      const statementOfWork = statementsOfWork?.find(
        (sow: StatementOfWork) => sow.id === assignment.statementOfWorkId
      );
      const project = projects.find(
        (project: Project) => project.id === statementOfWork.projectId
      );

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

  const userSkills = sortedUserSkills.map((skill) => ({
    skill: {
      name: skill.skill.name,
    },
    level: skill.level,
    yearsOfExperience: skill.yearsOfExperience,
  }));

  return {
    user,
    isEditing,
    isLoading: isLoadingAssignments || isLoadingRequirements || isLoadingSOWs,
    userProfile,
    projectHistory,
    userSkills,
    startEditing,
    stopEditing,
    handleUserUpdate,
    refreshUser,
  };
};

export default useUserHistoryController;
