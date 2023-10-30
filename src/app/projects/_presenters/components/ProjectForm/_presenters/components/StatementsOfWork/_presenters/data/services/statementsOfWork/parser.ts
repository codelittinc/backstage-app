export interface ApiStatementOfWorkFrom {
  end_date: Date;
  hour_delivery_schedule: string;
  hourly_revenue?: number | null;
  id: number;
  limit_by_delivery_schedule: boolean;
  model: string;
  project_id: number;
  start_date: Date;
  total_hours?: number | null;
  total_revenue: number;
}

export interface ApiStatementOfWorkTo {
  end_date: Date;
  hour_delivery_schedule: string;
  hourly_revenue?: number | null;
  id: number;
  limit_by_delivery_schedule: boolean;
  model: string;
  project_id: number;
  start_date: Date;
  total_hours?: number | null;
  total_revenue: number;
}

export function fromApiParser(sow: ApiStatementOfWorkFrom): StatementOfWork {
  return {
    id: sow.id,
    endDate: sow.end_date,
    hourDeliverySchedule: sow.hour_delivery_schedule,
    hourlyRevenue: sow.hourly_revenue,
    limitByDeliverySchedule: sow.limit_by_delivery_schedule,
    model: sow.model,
    startDate: sow.start_date,
    totalHours: sow.total_hours,
    totalRevenue: sow.total_revenue,
    projectId: sow.project_id,
  };
}

export function toApiParser(sow: StatementOfWork): ApiStatementOfWorkTo {
  return {
    id: sow.id,
    end_date: sow.endDate,
    hour_delivery_schedule: sow.hourDeliverySchedule,
    hourly_revenue: sow.hourlyRevenue,
    limit_by_delivery_schedule: sow.limitByDeliverySchedule,
    model: sow.model,
    start_date: sow.startDate,
    total_hours: sow.totalHours,
    total_revenue: sow.totalRevenue,
    project_id: sow.projectId,
  };
}
