export interface StatementOfWork {
  contractModel?: ContractModel;
  endDate: string;
  id?: number | string;
  name: string;
  projectId: number | string;
  startDate: string;
  totalRevenue: number;
}

export interface ContractModel {
  accumulateHours?: boolean;
  allowOverflow?: boolean;
  chargeUpfront?: boolean;
  contractModelType?: string;
  deliveryPeriod?: string;
  expectedHoursPerPeriod?: number;
  fixedTimeline?: boolean;
  hourlyCost?: number;
  hourlyPrice?: number;
  hoursAmount?: number;
  id?: number;
  limitBy?: string;
  managementFactor?: number;
  revenuePerPeriod?: number;
}
