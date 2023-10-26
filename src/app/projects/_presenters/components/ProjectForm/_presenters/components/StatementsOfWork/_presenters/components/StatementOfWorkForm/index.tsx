import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker"; // You may need a date picker component
import Autocomplete from "@/components/Autocomplete";
import { useEffect, useState } from "react";
import useStatementsOfWorkController from "../../controllers/statementsOfWorkController";

interface StatementOfWorkProps {
  statementOfWork: StatementOfWork;
}

function StatementOfWorkComponent({
  statementOfWork,
}: StatementOfWorkProps): JSX.Element {
  const [currentStatementOfWork, setCurrentStatementOfWork] =
    useState<StatementOfWork>(statementOfWork);

  const { onSave } = useStatementsOfWorkController(statementOfWork.projectId);
  const {
    model,
    startDate,
    endDate,
    hourlyRevenue,
    totalRevenue,
    hourDeliverySchedule,
    limitByDeliverySchedule,
    totalHours,
    projectId,
  } = currentStatementOfWork;

  const modelOptions = ["maintenance", "time_and_materials", "fixed_bid"];
  const hourDeliveryScheduleOptions = ["contract_period", "weekly", "monthly"];

  return (
    <Card id="statement-of-work-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Statement Of Work Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              label={"Model"}
              value={model}
              options={modelOptions}
              onChange={(value: string) => {
                setCurrentStatementOfWork({
                  ...currentStatementOfWork,
                  model: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date: Date) => {
                setCurrentStatementOfWork({
                  ...currentStatementOfWork,
                  startDate: date,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date: Date) => {
                setCurrentStatementOfWork({
                  ...currentStatementOfWork,
                  endDate: date,
                });
              }}
            />
          </Grid>
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
          <Grid item xs={12} sm={3}>
            <FormField
              label="Project ID"
              type="number"
              placeholder="1"
              value={projectId.toString()}
              onChange={({ target: { value } }) => {
                setCurrentStatementOfWork({
                  ...currentStatementOfWork,
                  projectId: parseInt(value),
                });
              }}
            />
          </Grid>
        </Grid>
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
  );
}

export default StatementOfWorkComponent;
