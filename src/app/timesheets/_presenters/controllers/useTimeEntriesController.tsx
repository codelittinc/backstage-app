import { useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getAssignments } from "@/app/_presenters/data/assignments";
import {
  getFirstDayOfTheWeek,
  getLastDayOfTheWeek,
} from "@/app/_presenters/utils/date";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

import { getTimeEntries } from "../data/timeEntries";

const useTimeEntriesController = () => {
  const queryClient = useQueryClient();
  const { startDate: date, updateDateRangeQuery } = useDateRangeController(
    new Date()
  );

  const startDate = getFirstDayOfTheWeek(date).toISOString();
  const endDate = getLastDayOfTheWeek(date).toDateString();

  const { data: statementsOfWork, isLoading: isLoadingStatementsOfWork } =
    useQuery({
      queryKey: [tanstackKeys.StatementsOfWork, startDate, endDate],
      queryFn: () => getStatementOfWorks(undefined, startDate, endDate),
      refetchInterval: 1000 * 60 * 60,
    });

  const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
    queryKey: [tanstackKeys.Assignments, startDate, endDate],
    queryFn: () =>
      getAssignments({
        startDate: startDate,
        endDate: endDate,
        statementOfWorkIds: statementsOfWork.map(
          (sow: StatementOfWork) => sow.id
        ),
      }),
    enabled: statementsOfWork?.length > 0,
    refetchInterval: 1000 * 60 * 60,
  });

  const { users, isLoading: isLoadingUsers } = useUsersController();
  const { projects, isLoading: isLoadingProjects } = useProjectsController(
    date,
    date
  );

  const sowIds = statementsOfWork?.map((sow: StatementOfWork) => sow.id);
  const timeEntriesQueryKey = [
    tanstackKeys.TimeEntries,
    startDate,
    endDate,
    sowIds,
  ];
  const { data: timeEntries, isLoading: isLoadingTimeEntries } = useQuery({
    queryKey: timeEntriesQueryKey,
    queryFn: () =>
      getTimeEntries({
        startDate: startDate,
        endDate: endDate,
        statementOfWorkIds: sowIds,
      }),
    enabled: sowIds?.length > 0,
    refetchInterval: 1000 * 60 * 60,
  });

  const invalidateTimeEntries = () => {
    queryClient.invalidateQueries(timeEntriesQueryKey);
  };

  return {
    invalidateTimeEntries,
    date,
    updateDateRangeQuery,
    statementsOfWork,
    isLoading:
      isLoadingStatementsOfWork ||
      isLoadingAssignments ||
      isLoadingUsers ||
      isLoadingProjects ||
      isLoadingTimeEntries,
    assignments,
    users,
    projects,
    timeEntries,
  };
};

export default useTimeEntriesController;
