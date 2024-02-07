import { Control } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";

import FixedBidContractModel from "./_presenters/components/FixedBidContractModel";
import MaintenanceContractModel from "./_presenters/components/MaintenanceContractModel";
import RetainerContractModel from "./_presenters/components/RetainerContractModel";
import TimeAndMaterialsAtCostContractModel from "./_presenters/components/TimeAndMaterialsAtCostContractModel";
import TimeAndMaterialsContractModel from "./_presenters/components/TimeAndMaterialsContractModel";

interface Props {
  contractModelType: string;
  control: Control<StatementOfWork>;
}

const ContractModel = ({ contractModelType, control }: Props) => {
  let Component;

  switch (contractModelType) {
    case "TimeAndMaterialsAtCostContractModel":
      Component = TimeAndMaterialsAtCostContractModel;
      break;
    case "TimeAndMaterialsContractModel":
      Component = TimeAndMaterialsContractModel;
      break;
    case "MaintenanceContractModel":
      Component = MaintenanceContractModel;
      break;
    case "FixedBidContractModel":
      Component = FixedBidContractModel;
      break;
    case "RetainerContractModel":
      Component = RetainerContractModel;
      break;
    default:
      return null;
  }

  return <Component control={control} />;
};

export default ContractModel;
