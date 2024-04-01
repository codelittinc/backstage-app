import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getProjects } from "../data/services/projects";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";

const useProjectsController = (startDate?: string, endDate?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.Projects,
      formatDateToMonthDayYear(startDate),
      formatDateToMonthDayYear(endDate),
    ],
    queryFn: () => getProjects(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return {
    projects: data,
    isLoading: isLoading,
  };
};

export default useProjectsController;
