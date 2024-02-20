import { Grid } from "@mui/material";
import { Control } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";

interface Props {
  control: Control<StatementOfWork>;
}

const MaintenanceContractModel = ({ control }: Props) => {
  const deliveryPeriodOptions = ["weekly", "monthly"];

  return (
    <>
      <Grid item xs={12}>
        <AutocompleteController
          label="Delivery period"
          name="contractModel.deliveryPeriod"
          options={deliveryPeriodOptions}
          control={control}
          getOptionLabel={(option: string | { id: string; name: string }) => {
            return option;
          }}
          isOptionEqualToValue={(
            option: { id: string; name: string },
            value: string | { id: string; name: string }
          ) => {
            return option == value;
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          name="contractModel.expectedHoursPerPeriod"
          label="Expected hours per period"
          placeholder="100"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          name="contractModel.hourlyCost"
          label="Hourly cost"
          placeholder="140"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          name="contractModel.revenuePerPeriod"
          label="Revenue per period"
          placeholder="100000"
          control={control}
        />
      </Grid>
      <Grid item xs={6}>
        <SwitchController
          name="contractModel.accumulateHours"
          label="Accumulate hours"
          control={control}
        />
      </Grid>
      <Grid item xs={6}>
        <SwitchController
          name="contractModel.chargeUpfront"
          label="Charge upfront"
          control={control}
        />
      </Grid>
    </>
  );
};

export default MaintenanceContractModel;
