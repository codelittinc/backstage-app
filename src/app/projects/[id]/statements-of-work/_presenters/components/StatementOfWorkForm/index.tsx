"use client";
import { Card, Grid } from "@mui/material";
import { useEffect } from "react";
import { DefaultValues, useForm, useWatch } from "react-hook-form";

import {
  ContractModel,
  StatementOfWork,
} from "@/app/_domain/interfaces/StatementOfWork";
import { getLastDayOfCurrentMonth } from "@/app/_presenters/utils/date";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import DatePickerController from "@/components/Form/FieldControllers/DatePickerController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Typography from "@/components/Typography";
import routes from "@/routes";

import ContractModelComponent from "./_presenters/components/ContractModelComponent";

interface Props {
  onDelete?: (StatementOfWork: StatementOfWork) => void;
  onSave: (statementOfWork: StatementOfWork) => void;
  projectId: string;
  statementOfWork?: StatementOfWork;
}

const getDefaultSow = (projectId: string): StatementOfWork => ({
  id: undefined,
  endDate: getLastDayOfCurrentMonth().toISOString(),
  startDate: new Date().toISOString(),
  totalRevenue: 0,
  projectId: projectId,
  name: "",
  contractModel: {
    id: undefined,
    contractModelType: "TimeAndMaterialsContractModel",
    chargeUpfront: false,
    expectedHoursPerPeriod: 0,
    revenuePerPeriod: 0,
    allowOverflow: false,
    hoursAmount: 0,
    limitBy: "contract_size",
    managementFactor: 0,
    deliveryPeriod: "weekly",
    hourlyCost: 0,
    accumulateHours: false,
  },
});

const modelOptions = [
  {
    id: "TimeAndMaterialsAtCostContractModel",
    name: "Time and Materials at Cost",
  },
  { id: "TimeAndMaterialsContractModel", name: "Time and Materials" },
  { id: "MaintenanceContractModel", name: "Maintenance" },
  { id: "FixedBidContractModel", name: "Fixed Bid" },
  { id: "RetainerContractModel", name: "Retainer" },
];

const StatementOfWorkForm: React.FC<Props> = ({
  statementOfWork,
  projectId,
  onSave,
  onDelete,
}) => {
  const defaultValues = mergeObjects(
    getDefaultSow(projectId),
    statementOfWork || {}
  ) as DefaultValues<StatementOfWork>;

  defaultValues.contractModel = mergeObjects(
    getDefaultSow(projectId).contractModel as ContractModel,
    statementOfWork?.contractModel || {}
  );

  const { handleSubmit, control, setValue } = useForm<StatementOfWork>({
    defaultValues,
  });

  const originalContractModel = statementOfWork?.contractModel;
  const originalContractModelType = originalContractModel?.contractModelType;
  const contractModel = useWatch({
    control,
    name: "contractModel",
  });

  const { contractModelType } = contractModel!;

  const { id: contractModelId } = contractModel!;

  useEffect(() => {
    if (contractModelType) {
      const id =
        originalContractModelType === contractModelType
          ? contractModelId
          : undefined;

      setValue("contractModel.id", id);
    }
  }, [contractModelType, contractModelId, setValue, originalContractModelType]);

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Card id="statement-of-work-info" sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Typography variant="h5">Statement Of Work</Typography>
          </Box>
          <Form
            onSave={() => handleSubmit(onSave)()}
            onDelete={
              statementOfWork?.id
                ? () => onDelete && onDelete(statementOfWork)
                : undefined
            }
            cancelPath={routes.projectPath(projectId, 1)}
          >
            <>
              <Grid item xs={12}>
                <TextInputController
                  label="Name"
                  placeholder="Statement of work name"
                  name="name"
                  control={control}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePickerController
                  label="Start Date"
                  name="startDate"
                  control={control}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePickerController
                  label="End Date"
                  name="endDate"
                  control={control}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInputController
                  label="Total revenue"
                  placeholder="Total revenue"
                  name="totalRevenue"
                  control={control}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AutocompleteController
                  label="Contract Model"
                  name="contractModel.contractModelType"
                  options={modelOptions}
                  control={control}
                  required
                  withObjectValue={false}
                />
              </Grid>
              <ContractModelComponent
                contractModelType={contractModelType!}
                control={control}
              />
            </>
          </Form>
        </Card>
      </Grid>
    </FormLayout>
  );
};

export default StatementOfWorkForm;
