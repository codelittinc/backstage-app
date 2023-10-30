interface Customer {
  id?: number;
  name: string;
  notificationsToken: string | undefined;
  slug: string;
  sourceControlToken: string | undefined;
  ticketTrackingSystemToken: string | undefined;
}
