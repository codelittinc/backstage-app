interface StatementOfWork {
  id: number;
  endDate: string;
  hourDeliverySchedule: string;
  hourlyRevenue?: number | null;
  limitByDeliverySchedule: boolean;
  model: string;
  startDate: string;
  totalHours?: number | null;
  totalRevenue: number;
  projectId: number;
}
