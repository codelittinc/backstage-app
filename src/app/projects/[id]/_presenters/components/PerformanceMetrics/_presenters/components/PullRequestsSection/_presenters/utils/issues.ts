import Issue from "../../../IssuesSection/_presenters/domain/interfaces/issue";

export function getUniqueUserIds(issues: Issue[]): number[] {
  if (!issues) return [];
  const userIds = new Set();

  issues.forEach((obj) => {
    userIds.add(obj.userId); // Updated to user_id
  });

  // @ts-ignore
  return [...userIds];
}
