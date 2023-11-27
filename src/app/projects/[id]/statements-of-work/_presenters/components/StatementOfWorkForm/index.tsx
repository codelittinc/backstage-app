"use client";
import { Switch } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import FormField from "@/components/FormField";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Typography from "@/components/Typography";

interface StatementOfWorkProps {
  onSave: (statementOfWork: StatementOfWork) => void;
  statementOfWork: StatementOfWork;
}

const fieldsToDisplay = {
  maintenance: {
    hourlyRevenue: true,
    totalRevenue: true,
    limitByDeliverySchedule: true,
    hourDeliverySchedule: true,
    totalHours: true,
  },
  time_and_materials: {
    hourlyRevenue: true,
    totalRevenue: true,
    limitByDeliverySchedule: true,
    hourDeliverySchedule: true,
    totalHours: true,
  },
  fixed_bid: {
    hourlyRevenue: false,
    totalRevenue: true,
    limitByDeliverySchedule: false,
    hourDeliverySchedule: false,
    totalHours: false,
  },
};

function StatementOfWorkComponent({
  statementOfWork,
  onSave,
}: StatementOfWorkProps): JSX.Element {
  const [currentStatementOfWork, setCurrentStatementOfWork] =
    useState<StatementOfWork>(statementOfWork);

  const {
    model,
    startDate,
    endDate,
    hourlyRevenue,
    totalRevenue,
    hourDeliverySchedule,
    limitByDeliverySchedule,
    totalHours,
    name,
  } = currentStatementOfWork;

  const modelOptions = [
    { id: "maintenance", name: "Maintenance" },
    { id: "time_and_materials", name: "Time and materials" },
    { id: "fixed_bid", name: "Fixed bid" },
  ];

  const hourDeliveryScheduleOptions = ["contract_period", "weekly", "monthly"];

  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
  ];

  const modelObject = modelOptions.find((option) => option.id === model);
  const displayFields = fieldsToDisplay[model];

  return (
    <FormLayout sidebarItems={sidenavItems}>
      <Grid item xs={12}>
        <Card id="statement-of-work-info" sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Typography variant="h5">Statement Of Work Info</Typography>
          </Box>
          <Box component="form" pb={3} px={3}>
            <Grid container spacing={3} pb={3} px={3}>
              <Grid item xs={12} sm={3}>
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
            </Grid>
            <Grid container spacing={3} pb={3} px={3}>
              <Grid item xs={12} sm={3}>
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
                      model: value.id,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} pb={3} px={3}>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(value) => {
                    setCurrentStatementOfWork({
                      ...currentStatementOfWork,
                      startDate: value[0],
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(value) => {
                    setCurrentStatementOfWork({
                      ...currentStatementOfWork,
                      endDate: value[0],
                    });
                  }}
                />
              </Grid>
            </Grid>
            {displayFields.hourlyRevenue && (
              <Grid container spacing={3} pb={3} px={3}>
                <Grid item xs={12} sm={3}>
                  <FormField
                    label="Hourly Revenue"
                    type="number"
                    placeholder="100"
                    value={hourlyRevenue || ""}
                    onChange={({ target: { value } }) => {
                      setCurrentStatementOfWork({
                        ...currentStatementOfWork,
                        hourlyRevenue: parseFloat(value),
                      });
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {displayFields.totalRevenue && (
              <Grid container spacing={3} pb={3} px={3}>
                <Grid item xs={12} sm={3}>
                  <FormField
                    label="Total Revenue"
                    type="number"
                    placeholder="1000"
                    value={totalRevenue.toString()}
                    onChange={({ target: { value } }) => {
                      setCurrentStatementOfWork({
                        ...currentStatementOfWork,
                        totalRevenue: parseFloat(value),
                      });
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {displayFields.hourDeliverySchedule && (
              <Grid container spacing={3} pb={3} px={3}>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    label={"Hour Delivery Schedule"}
                    value={hourDeliverySchedule}
                    options={hourDeliveryScheduleOptions}
                    onChange={(value: string) => {
                      setCurrentStatementOfWork({
                        ...currentStatementOfWork,
                        hourDeliverySchedule: value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {displayFields.totalHours && (
              <Grid container spacing={3} pb={3} px={3}>
                <Grid item xs={12} sm={3}>
                  <FormField
                    label="Total Hours"
                    type="number"
                    placeholder="40"
                    value={totalHours || ""}
                    onChange={({ target: { value } }) => {
                      setCurrentStatementOfWork({
                        ...currentStatementOfWork,
                        totalHours: parseFloat(value),
                      });
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {displayFields.limitByDeliverySchedule && (
              <Grid container spacing={3} pb={3} px={3}>
                <Grid item xs={12} md={3} lg={3}>
                  <Box display="flex" alignItems="center" lineHeight={1}>
                    <Typography variant="caption" fontWeight="regular">
                      Limit by delivery schedule
                    </Typography>
                    <Box ml={1}>
                      <Switch
                        checked={limitByDeliverySchedule}
                        onChange={() => {
                          setCurrentStatementOfWork({
                            ...currentStatementOfWork,
                            limitByDeliverySchedule: !limitByDeliverySchedule,
                          });
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
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
          </Box>
        </Card>
      </Grid>
    </FormLayout>
  );
}

export default StatementOfWorkComponent;
