type Participant = {
  email: string;
  id: number;
  imageUrl?: string;
  name: string;
  slug: string;
};

type Project = {
  billable: boolean;
  customer: Customer;
  id?: number;
  logoBackgroundColor?: string;
  logoUrl?: string;
  name: string;
  participants?: Participant[];
  slackChannel?: string;
  slug?: string;
  syncSourceControl: boolean;
  syncTicketTrackingSystem: boolean;
  displayCodeMetrics: boolean;
  displayTasksMetrics: boolean;
  reportKey: string;
};
