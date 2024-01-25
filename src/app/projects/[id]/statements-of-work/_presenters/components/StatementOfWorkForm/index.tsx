"use client";
import { Switch } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import Button from "@/components/Button";
import DateRangePicker from "@/components/DateRangePicker";
import FormField from "@/components/FormField";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Typography from "@/components/Typography";

import ContractModel from "./_presenters/components/ContractModel";

interface StatementOfWorkProps {
  onSave: (statementOfWork: StatementOfWork) => void;
  statementOfWork: StatementOfWork;
}

function StatementOfWorkComponent({
  statementOfWork,
  onSave,
}: StatementOfWorkProps): JSX.Element {
  const [currentStatementOfWork, setCurrentStatementOfWork] =
    useState<StatementOfWork>(statementOfWork);

  const { startDate, endDate, name, contractModel, totalRevenue } =
    currentStatementOfWork;
  const { contractModelType } = contractModel!;

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

  const modelObject = modelOptions.find(
    (model) => model.id === contractModelType
  );

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Card id="statement-of-work-info" sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Typography variant="h5">Statement Of Work</Typography>
          </Box>
          <Box component="form">
            <Grid container spacing={2} pb={3} px={3}>
              <Grid item xs={12}>
                <FormField
                  label="Name"
                  placeholder="Statement of work name"
                  value={name || ""}
                  onChange={({ target: { value } }) => {
                    setCurrentStatementOfWork({
                      ...currentStatementOfWork,
                      name: value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DateRangePicker
                  label="Project period"
                  startDate={startDate}
                  endDate={endDate}
                  onDateRangeChange={(newStartDate: Date, newEndDate: Date) => {
                    setCurrentStatementOfWork({
                      ...currentStatementOfWork,
                      startDate: newStartDate.toDateString(),
                      endDate: newEndDate.toDateString(),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label="Total revenue"
                  placeholder="1000000,00"
                  value={totalRevenue}
                  onChange={({ target: { value } }) => {
                    setCurrentStatementOfWork({
                      ...currentStatementOfWork,
                      totalRevenue: value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  label={"Contract model"}
                  value={modelObject}
                  getOptionLabel={(option: any) => option.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.id == value.id
                  }
                  options={modelOptions}
                  onChange={(value: string) => {
                    setCurrentStatementOfWork({
                      ...currentStatementOfWork,
                      contractModel: {
                        ...contractModel,
                        contractModelType: value.id,
                      },
                    });
                  }}
                />
              </Grid>

              <ContractModel
                contractModel={contractModel!}
                onChange={(
                  key: string,
                  value: string | number | undefined | boolean
                ) => {
                  setCurrentStatementOfWork({
                    ...currentStatementOfWork,
                    contractModel: {
                      ...contractModel,
                      [key]: value,
                    },
                  });
                }}
              />

              <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
                <Box
                  display="flex"
                  justifyContent={{ md: "flex-end" }}
                  alignItems="center"
                  lineHeight={1}
                >
                  <Button
                    variant="gradient"
                    color="dark"
                    size="small"
                    onClick={() => onSave(currentStatementOfWork)}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </FormLayout>
  );
}

export default StatementOfWorkComponent;
