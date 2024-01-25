import { Box, Grid, Switch, Typography } from "@mui/material";

import { ContractModel } from "@/app/_domain/interfaces/StatementOfWork";
import FormField from "@/components/FormField";

interface Props {
  contractModel: ContractModel;
  onChange: (key: string, value: string | number | boolean | undefined) => void;
}

const RetainerContractModel = ({ contractModel, onChange }: Props) => {
  const { chargeUpfront, expectedHoursPerPeriod, revenuePerPeriod } =
    contractModel;

  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="caption" fontWeight="regular">
            Charge Upfront
          </Typography>
          <Switch
            checked={chargeUpfront}
            onChange={(event) =>
              onChange("chargeUpfront", event.target.checked)
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Expected Hours per Period"
          type="number"
          value={expectedHoursPerPeriod || ""}
          onChange={({ target: { value } }) => {
            onChange("expectedHoursPerPeriod", parseFloat(value));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Revenue per Period"
          type="number"
          value={revenuePerPeriod || ""}
          onChange={({ target: { value } }) => {
            onChange("revenuePerPeriod", parseFloat(value));
          }}
        />
      </Grid>
    </>
  );
};

export default RetainerContractModel;
