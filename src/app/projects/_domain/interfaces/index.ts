interface Project {
  billable: boolean;
  customer: Customer;
  endDate: string | null;
  id?: number;
  name: string;
  slackChannel: string | null;
  slug: string;
  startDate: string | null;
}
