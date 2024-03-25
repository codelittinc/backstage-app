type Issue = {
  id: number;
  effort?: number;
  userId: number;
  state: string;
  closedDate?: string;
  title: string;
  issueType: string;
  reportedAt: string;
  ttsId: string;
};

export default Issue;
