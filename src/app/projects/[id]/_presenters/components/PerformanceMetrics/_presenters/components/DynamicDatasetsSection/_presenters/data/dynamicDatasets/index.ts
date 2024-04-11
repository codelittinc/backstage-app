import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";
import DynamicDataset from "../../../_domain/dynamicDataset";

const fromApiParser = (apiData: any): DynamicDataset => ({
  id: apiData.id,
  projectId: apiData.project_id,
  data: apiData.data,
});

export const getDynamicDatasets = async (
  projectId: number
): Promise<DynamicDataset[]> => {
  const { data } = await backstageApiClient.get(`/dynamic_datasets.json`, {
    params: {
      project_id: projectId,
    },
  });
  return data.map(fromApiParser);
};
