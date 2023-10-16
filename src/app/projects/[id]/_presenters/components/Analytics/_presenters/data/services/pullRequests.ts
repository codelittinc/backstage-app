import axios from "axios";
import { getRoadrunnerUrl } from "@/api";

export const getPullRequests = async ({
  userId,
  state = "merged",
  projectId,
  startDate,
  endDate,
}: {
  userId?: number;
  state: string;
  projectId?: number;
  startDate: string;
  endDate: string;
}) => {
  const { data } = await axios.get(getRoadrunnerUrl("/pull_requests.json"), {
    params: {
      userId: userId,
      state: state,
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
