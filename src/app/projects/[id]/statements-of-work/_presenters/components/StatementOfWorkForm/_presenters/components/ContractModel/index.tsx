import { ContractModel } from "@/app/_domain/interfaces/StatementOfWork";

import FixedBidContractModel from "./_presenters/components/FixedBidContractModel";
import MaintenanceContractModel from "./_presenters/components/MaintenanceContractModel";
import RetainerContractModel from "./_presenters/components/RetainerContractModel";
import TimeAndMaterialsAtCostContractModel from "./_presenters/components/TimeAndMaterialsAtCostContractModel";
import TimeAndMaterialsContractModel from "./_presenters/components/TimeAndMaterialsContractModel";

interface Props {
  contractModel: ContractModel;
  onChange: (key: string, value: string | number | undefined | boolean) => void;
}

const modelOptions = [
  {
    id: "TimeAndMaterialsAtCostContractModel",
    component: TimeAndMaterialsAtCostContractModel,
  },
  {
    id: "TimeAndMaterialsContractModel",
    component: TimeAndMaterialsContractModel,
  },
  { id: "MaintenanceContractModel", component: MaintenanceContractModel },
  { id: "FixedBidContractModel", component: FixedBidContractModel },
  { id: "RetainerContractModel", component: RetainerContractModel },
];

const ContractModel = ({ contractModel, onChange }: Props) => {
  const Component = modelOptions.find(
    (model) => model.id === contractModel.contractModelType
  )?.component;

  return <Component contractModel={contractModel} onChange={onChange} />;
};

export default ContractModel;
