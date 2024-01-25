import { Box, Grid, Switch } from "@mui/material";

import { ContractModel } from "@/app/_domain/interfaces/StatementOfWork";
import Autocomplete from "@/components/Autocomplete";
import FormField from "@/components/FormField";
import Typography from "@/components/Typography";

interface Props {
  contractModel: ContractModel;
  onChange: (key: string, value: string | number | boolean | undefined) => {};
}

const MaintenanceContractModel = ({ contractModel, onChange }: Props) => {
  const {
    accumulateHours,
    chargeUpfront,
    deliveryPeriod,
    expectedHoursPerPeriod,
    hourlyCost,
    revenuePerPeriod,
  } = contractModel;
  const deliveryPeriodOptions = [
    { id: "weekly", name: "Weekly" },
    { id: "monthly", name: "Monthly" },
  ];
  const deliveryPeriodObject = deliveryPeriodOptions.find(
    (period) => period.id === deliveryPeriod
  );
  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          label={"Delivery period"}
          value={deliveryPeriodObject}
          getOptionLabel={(option: any) => option.name}
          isOptionEqualToValue={(option: any, value: any) =>
            option.id == value.id
          }
          options={deliveryPeriodOptions}
          onChange={(value: any) => {
            onChange("deliveryPeriod", value.id);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Expected hours per period"
          placeholder="100"
          value={expectedHoursPerPeriod}
          onChange={({ target: { value } }) => {
            onChange("expectedHoursPerPeriod", value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Hourly cost"
          placeholder="140"
          value={hourlyCost}
          onChange={({ target: { value } }) => {
            onChange("hourlyCost", value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Revenue per period"
          placeholder="100000"
          value={revenuePerPeriod}
          onChange={({ target: { value } }) => {
            onChange("revenuePerPeriod", value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" alignItems="center">
          <Typography variant="caption" fontWeight="regular">
            Accumulate hours
          </Typography>
          <Switch
            checked={accumulateHours}
            onChange={() => onChange("accumulateHours", !accumulateHours)}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" alignItems="center">
          <Typography variant="caption" fontWeight="regular">
            Charge upfront
          </Typography>
          <Switch
            checked={chargeUpfront}
            onChange={() => onChange("chargeUpfront", !chargeUpfront)}
          />
        </Box>
      </Grid>
    </>
  );
};

export default MaintenanceContractModel;
