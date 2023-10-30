import User from "@/app/_domain/interfaces/User"; // Assuming you have a User interface to represent the user related to an issue.

export interface ApiIssue {
  closed_date?: string;
  effort?: number;
  id?: number;
  state?: string;
  user?: User;
  user_id: number;
}

export const toApiParser = (issue: Issue): ApiIssue => {
  return {
    id: issue.id,
    closed_date: issue.closedDate,
    effort: issue.effort,
    state: issue.state,
    user_id: issue.userId,
  };
};

export const fromApiParser = (apiIssue: ApiIssue): Issue => {
  return {
    id: apiIssue.id,
    closedDate: apiIssue.closed_date,
    effort: apiIssue.effort,
    state: apiIssue.state,
    userId: apiIssue.user_id,
    user: apiIssue.user,
  };
};
