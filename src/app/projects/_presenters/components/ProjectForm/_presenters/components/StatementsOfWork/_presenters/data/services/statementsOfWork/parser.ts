import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";

// Interfaces to represent the data structure of ContractModel coming from and going to the API
export interface ApiContractModelFrom {
  accumulate_hours?: boolean;
  allow_overflow?: boolean;
  charge_upfront?: boolean;
  contract_model_type?: string;
  delivery_period?: string;
  expected_hours_per_period?: number;
  fixed_timeline?: boolean;
  hourly_cost?: number;
  hourly_price?: number;
  hours_amount?: number;
  id?: number;
  limit_by?: string;
  management_factor?: number;
  revenue_per_period?: number;
}

export interface ApiContractModelTo {
  accumulate_hours?: boolean;
  allow_overflow?: boolean;
  charge_upfront?: boolean;
  contract_model_type?: string;
  delivery_period?: string;
  expected_hours_per_period?: number;
  fixed_timeline?: boolean;
  hourly_cost?: number;
  hourly_price?: number;
  hours_amount?: number;
  id?: number;
  limit_by?: string;
  management_factor?: number;
  revenue_per_period?: number;
}

// Interfaces to represent the data structure of StatementOfWork coming from and going to the API
export interface ApiStatementOfWorkFrom {
  contract_model?: ApiContractModelFrom;
  contract_model_id?: number;
  contract_model_type?: string;
  end_date: string;
  id: number;
  name: string;
  project_id: number;
  start_date: string;
  total_revenue: number;
}

export interface ApiStatementOfWorkTo {
  contract_model?: ApiContractModelTo;
  end_date: string;
  id: number | undefined;
  name: string;
  project_id: number | string;
  start_date: string;
  total_revenue: number;
}

// Parser function to convert data from API format to application format
export function fromApiParser(sow: ApiStatementOfWorkFrom): StatementOfWork {
  return {
    id: sow.id,
    name: sow.name,
    startDate: sow.start_date,
    endDate: sow.end_date,
    totalRevenue: sow.total_revenue,
    projectId: sow.project_id,
    contractModel: sow.contract_model
      ? {
          id: sow.contract_model.id,
          contractModelType: sow.contract_model.contract_model_type,
          allowOverflow: sow.contract_model.allow_overflow,
          hoursAmount: sow.contract_model.hours_amount,
          limitBy: sow.contract_model.limit_by,
          managementFactor: sow.contract_model.management_factor,
          hourlyPrice: sow.contract_model.hourly_price,
          accumulateHours: sow.contract_model.accumulate_hours,
          chargeUpfront: sow.contract_model.charge_upfront,
          deliveryPeriod: sow.contract_model.delivery_period,
          expectedHoursPerPeriod: sow.contract_model.expected_hours_per_period,
          hourlyCost: sow.contract_model.hourly_cost,
          revenuePerPeriod: sow.contract_model.revenue_per_period,
          fixedTimeline: sow.contract_model.fixed_timeline,
        }
      : undefined,
  };
}

// Parser function to convert data from application format to API format
export function toApiParser(sow: StatementOfWork): ApiStatementOfWorkTo {
  const baseAttributes = {
    id: sow.id,
    name: sow.name,
    start_date: sow.startDate,
    end_date: sow.endDate,
    total_revenue: sow.totalRevenue,
    project_id: sow.projectId,
  };

  if (!sow.contractModel) {
    return {
      ...baseAttributes,
      contract_model_attributes: undefined,
    };
  }

  const contractModelType = sow.contractModel.contractModelType;
  let contractModelAttributes = {};

  switch (contractModelType) {
    case "TimeAndMaterialsAtCostContractModel":
      contractModelAttributes = {
        allow_overflow: sow.contractModel.allowOverflow,
        hours_amount: sow.contractModel.hoursAmount,
        limit_by: sow.contractModel.limitBy,
        management_factor: sow.contractModel.managementFactor,
      };
      break;
    case "TimeAndMaterialsContractModel":
      contractModelAttributes = {
        allow_overflow: sow.contractModel.allowOverflow,
        hourly_price: sow.contractModel.hourlyPrice,
        hours_amount: sow.contractModel.hoursAmount,
        limit_by: sow.contractModel.limitBy,
      };
      break;
    case "MaintenanceContractModel":
      contractModelAttributes = {
        accumulate_hours: sow.contractModel.accumulateHours,
        charge_upfront: sow.contractModel.chargeUpfront,
        delivery_period: sow.contractModel.deliveryPeriod,
        expected_hours_per_period: sow.contractModel.expectedHoursPerPeriod,
        hourly_cost: sow.contractModel.hourlyCost,
        revenue_per_period: sow.contractModel.revenuePerPeriod,
      };
      break;
    case "FixedBidContractModel":
      contractModelAttributes = {
        fixed_timeline: sow.contractModel.fixedTimeline,
      };
      break;
    case "RetainerContractModel":
      contractModelAttributes = {
        charge_upfront: sow.contractModel.chargeUpfront,
        expected_hours_per_period: sow.contractModel.expectedHoursPerPeriod,
        revenue_per_period: sow.contractModel.revenuePerPeriod,
      };
      break;
    default:
      break;
  }

  return {
    ...baseAttributes,
    contract_model_attributes: {
      id: sow.contractModel.id,
      contract_model_type: contractModelType,
      ...contractModelAttributes,
    },
  };
}
