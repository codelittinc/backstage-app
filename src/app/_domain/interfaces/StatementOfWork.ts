interface StatementOfWork {
  endDate: string;
  hourDeliverySchedule: string;
  hourlyRevenue?: number | null;
  id?: number;
  limitByDeliverySchedule: boolean;
  model: string;
  name: string;
  projectId: number | string;
  startDate: string;
  totalHours?: number | null;
  totalRevenue: number;
}
