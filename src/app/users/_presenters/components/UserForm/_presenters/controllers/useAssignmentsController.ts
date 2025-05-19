import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import {
  getAssignments,
  updateAssignment,
} from "@/app/_presenters/data/assignments";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import { getProjects } from "@/app/projects/_presenters/data/services/projects";
import Assignment from "@/app/_domain/interfaces/Assignment";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { Project } from "@/app/_domain/interfaces/Project";

type AssignmentWithProject = Assignment & {
  project?: Project;
};

const useAssignmentsController = (userId: number) => {
  const queryClient = useQueryClient();
  const startDate = "2020-01-01T00:00:00.000Z";
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const endDate = today.toISOString();

  // First, get all statements of work
  const { data: statementsOfWork, isLoading: isLoadingSOWs } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, startDate, endDate],
    queryFn: () => getStatementOfWorks(undefined, startDate, endDate),
  });

  // Then, get assignments for those statements of work
  const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
    queryKey: [
      tanstackKeys.Assignments,
      startDate,
      endDate,
      statementsOfWork?.map((sow: StatementOfWork) => sow.id),
    ],
    queryFn: () =>
      getAssignments({
        startDate,
        endDate,
        statementOfWorkIds:
          statementsOfWork?.map((sow: StatementOfWork) => sow.id as number) ||
          [],
      }),
    enabled: !!statementsOfWork,
  });

  // Finally, get all projects
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: [tanstackKeys.Projects, startDate, endDate],
    queryFn: () => getProjects(startDate, endDate),
  });

  const updateAssignmentMutation = useMutation({
    mutationFn: async (assignment: Assignment) => {
      return updateAssignment(assignment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tanstackKeys.Assignments] });
    },
  });

  // Filter assignments for this user and enrich with project data
  const assignmentsWithProjects: AssignmentWithProject[] =
    assignments
      ?.filter((assignment: Assignment) => assignment.userId === userId)
      .map((assignment: Assignment) => {
        const statementOfWork = statementsOfWork?.find(
          (sow: StatementOfWork) => sow.id === assignment.statementOfWorkId
        );
        const project = projects?.find(
          (project: Project) => project.id === statementOfWork?.projectId
        );

        return {
          ...assignment,
          project,
        };
      }) || [];

  return {
    assignments: assignmentsWithProjects,
    isLoading: isLoadingAssignments || isLoadingSOWs || isLoadingProjects,
    updateAssignment: updateAssignmentMutation.mutate,
    isUpdating: updateAssignmentMutation.isLoading,
  };
};

export default useAssignmentsController;
