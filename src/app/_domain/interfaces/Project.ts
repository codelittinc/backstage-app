import { Customer } from "./Customer";

export type Participant = {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  slug: string;
};

export type Project = {
  id?: number;
  name: string;
  billable: boolean;
  slackChannel?: string;
  slug: string;
  customer: Customer;
  logoUrl?: string;
  logoBackgroundColor?: string;
  participants: Participant[];
  syncSourceControl: boolean;
  syncTicketTrackingSystem: boolean;
  displayCodeMetrics: boolean;
  displayTasksMetrics: boolean;
  reportKey: string;
};

export default Project;
