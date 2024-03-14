export type StatementOfWork = {
  contractModel?: ContractModel;
  endDate: string;
  id?: number;
  name: string;
  projectId: number | string;
  startDate: string;
  totalRevenue: number;
};

export type ContractModel = {
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
};
