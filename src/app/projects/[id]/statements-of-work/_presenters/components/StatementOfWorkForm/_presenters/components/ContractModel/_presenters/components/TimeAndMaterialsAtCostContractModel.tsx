import { Box, Grid, Switch, Typography } from "@mui/material";

import { ContractModel } from "@/app/_domain/interfaces/StatementOfWork";
import Autocomplete from "@/components/Autocomplete";
import FormField from "@/components/FormField";

interface Props {
  contractModel: ContractModel;
  onChange: (key: string, value: string | number | boolean | undefined) => void;
}

const TimeAndMaterialsAtCostContractModel = ({
  contractModel,
  onChange,
}: Props) => {
  const { allowOverflow, hoursAmount, limitBy, managementFactor } =
    contractModel;

  const limitByOptions = [
    { id: "contract_size", name: "Contract Size" },
    { id: "hours", name: "Number of hours" },
  ];

  const limitByObject = limitByOptions.find((option) => option.id === limitBy);
  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="caption" fontWeight="regular">
            Allow Overflow
          </Typography>
          <Switch
            checked={allowOverflow}
            onChange={(event) =>
              onChange("allowOverflow", event.target.checked)
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Hours Amount"
          type="number"
          value={hoursAmount || ""}
          onChange={({ target: { value } }) => {
            onChange("hoursAmount", parseFloat(value));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          label={"Limit by"}
          value={limitByObject}
          getOptionLabel={(option: any) => option.name}
          isOptionEqualToValue={(option: any, value: any) =>
            option.id == value.id
          }
          options={limitByOptions}
          onChange={(value: any) => {
            onChange("limitBy", value.id);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          label="Management Factor"
          type="number"
          value={managementFactor || ""}
          onChange={({ target: { value } }) => {
            onChange("managementFactor", parseFloat(value));
          }}
        />
      </Grid>
    </>
  );
};

export default TimeAndMaterialsAtCostContractModel;
