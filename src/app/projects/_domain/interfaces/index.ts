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
  endDate: string | null;
  id?: number;
  logoUrl: string | null;
  name: string;
  participants: Participant[];
  slackChannel: string | null;
  slug: string;
  startDate: string | null;
};
