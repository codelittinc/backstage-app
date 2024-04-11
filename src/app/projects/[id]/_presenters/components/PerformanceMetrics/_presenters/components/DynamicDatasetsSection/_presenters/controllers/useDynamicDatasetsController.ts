import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useQuery } from "@tanstack/react-query";
import { getDynamicDatasets } from "../data/dynamicDatasets";

const useDynamicDatasetsController = (projectId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.DynamicDatasets, projectId],
    queryFn: () => getDynamicDatasets(projectId),
  });

  return {
    dynamicDatasets: data,
    isLoading,
  };
};

export default useDynamicDatasetsController;
