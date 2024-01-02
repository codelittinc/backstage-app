type Participant = {
  email: string;
  id: number;
  imageUrl: string | null;
  name: string;
  slug: string;
};

type Project = {
  billable: boolean;
  customer: Customer;
  id?: number;
  logoUrl: string | undefined;
  logoBackgroundColor: string | undefined;
  name: string;
  participants: Participant[];
  slackChannel: string | null;
  slug: string;
  syncSourceControl: boolean;
  syncTicketTrackingSystem: boolean;
};
