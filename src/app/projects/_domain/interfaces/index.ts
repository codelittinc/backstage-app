interface Project {
  id?: number;
  name: string;
  billable: boolean;
  slack_channel: string | null;
  start_date: string | null;
  end_date: string | null;
  metadata: string | null;
  customer: Customer;
}
