interface Project {
  id?: number;
  name: string;
  billable: boolean;
  slackChannel: string | null;
  startDate: string | null;
  endDate: string | null;
  customer: Customer;
}
