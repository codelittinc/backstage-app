"use client";
import { Card, Grid } from "@mui/material";
import { useEffect } from "react";
import { DefaultValues, useForm, useWatch } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { getLastDayOfCurrentMonth } from "@/app/_presenters/utils/date";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import { Option } from "@/components/Form/FieldControllers/AutocompleteController";
import DatePickerController from "@/components/Form/FieldControllers/DatePickerController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Typography from "@/components/Typography";

import ContractModel from "./_presenters/components/ContractModel";

interface Props {
  onSave: (statementOfWork: StatementOfWork) => void;
  projectId: string;
  statementOfWork: StatementOfWork;
}

const getDefaultSow = (projectId: string) => ({
  id: undefined,
  endDate: getLastDayOfCurrentMonth().toISOString(),
  startDate: new Date().toISOString(),
  hourlyRevenue: "",
  totalRevenue: "",
  projectId: projectId,
  name: "",
  contractModel: {
    id: undefined,
    contractModelType: "TimeAndMaterialsContractModel",
    chargeUpfront: false,
    expectedHoursPerPeriod: "",
    revenuePerPeriod: "",
    allowOverflow: false,
    hoursAmount: "",
    limitBy: "contract_size",
    managementFactor: "",
    deliveryPeriod: "weekly",
    hourlyCost: "",
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
}) => {
  const defaultValues = mergeObjects(
    statementOfWork || {},
    getDefaultSow(projectId)
  ) as DefaultValues<StatementOfWork>;

  defaultValues.contractModel = mergeObjects(
    getDefaultSow(projectId).contractModel,
    statementOfWork.contractModel || {}
  );

  const { contractModel } = statementOfWork;
  const { id: contractModelId, contractModelType: originalContractModelType } =
    contractModel!;

  const { handleSubmit, control, setValue } = useForm<StatementOfWork>({
    defaultValues,
  });

  const contractModelType = useWatch({
    control,
    name: "contractModel.contractModelType",
  });

  useEffect(() => {
    if (contractModelType) {
      const id =
        originalContractModelType === contractModelType
          ? contractModelId
          : undefined;

      setValue("contractModel.id", id);
    }
  }, [contractModelType, setValue, contractModelId, originalContractModelType]);

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Card id="statement-of-work-info" sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Typography variant="h5">Statement Of Work</Typography>
          </Box>
          <Form onSave={() => handleSubmit(onSave)()}>
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
                  getOptionLabel={(
                    option: string | { id: string; name: string }
                  ) => {
                    if (typeof option === "string") {
                      return modelOptions.find((model) => model.id === option)
                        ?.name;
                    } else {
                      return option.name;
                    }
                  }}
                  isOptionEqualToValue={(
                    option: { id: string; name: string },
                    value: string | { id: string; name: string }
                  ) => {
                    if (typeof value === "string") {
                      return option.id === value;
                    } else {
                      return option.id == value.id;
                    }
                  }}
                  processSelectedValue={(selectedValue: Option | string) => {
                    if (typeof selectedValue === "string") {
                      return selectedValue;
                    }

                    return selectedValue.id;
                  }}
                  required
                />
              </Grid>
              <ContractModel
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
