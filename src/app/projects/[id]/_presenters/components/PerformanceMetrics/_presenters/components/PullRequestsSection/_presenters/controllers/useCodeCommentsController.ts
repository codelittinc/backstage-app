import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getCodeComments } from "../data/services/codeComments";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";

const useCodeCommentsController = (
  project: Project,
  startDateFilter: string,
  endDateFilter: string
) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.codeComments,
      formatDateToMonthDayYear(startDateFilter),
      formatDateToMonthDayYear(endDateFilter),
      project.id,
    ],
    queryFn: () =>
      getCodeComments({
        projectId: project.id,
        startDate: startDateFilter,
        endDate: endDateFilter,
      }),
  });

  return {
    codeComments: data,
    isLoading: isLoading,
  };
};

export default useCodeCommentsController;
