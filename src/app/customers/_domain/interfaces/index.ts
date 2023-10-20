interface Customer {
  id?: number;
  name: string;
  notificationsToken: string | undefined;
  sourceControlToken: string | undefined;
  ticketTrackingSystemToken: string | undefined;
  slug: string;
}
