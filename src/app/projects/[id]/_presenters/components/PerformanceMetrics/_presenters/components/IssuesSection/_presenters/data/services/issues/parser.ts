import { User } from "@/app/_domain/interfaces/User";
import Issue from "../../../domain/interfaces/issue";

interface ApiIssue {
  closed_date?: string;
  effort?: number;
  state: string;
  user?: User;
  user_id: number;
  title: string;
  issue_type: string;
  id: number;
  reported_at: string;
  tts_id: string;
}

export const fromApiParser = (apiIssue: ApiIssue): Issue => {
  return {
    id: apiIssue.id,
    ttsId: apiIssue.tts_id,
    closedDate: apiIssue.closed_date,
    effort: apiIssue.effort,
    state: apiIssue.state,
    userId: apiIssue.user_id,
    title: apiIssue.title,
    issueType: apiIssue.issue_type,
    reportedAt: apiIssue.reported_at,
  };
};
