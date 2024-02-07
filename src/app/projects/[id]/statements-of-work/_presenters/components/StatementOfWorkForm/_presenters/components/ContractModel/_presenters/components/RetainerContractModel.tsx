import { Grid } from "@mui/material";
import { Control } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";

interface Props {
  control: Control<StatementOfWork>;
}

const RetainerContractModel = ({ control }: Props) => {
  return (
    <>
      <Grid item xs={12}>
        <SwitchController
          name="contractModel.chargeUpfront"
          label="Charge upfront"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          name="contractModel.expectedHoursPerPeriod"
          label="Expected hours per period"
          placeholder="1000"
          type="number"
          control={control}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          type="number"
          name="contractModel.revenuePerPeriod"
          label="Revenue per period"
          placeholder="100000"
          control={control}
          required
        />
      </Grid>
    </>
  );
};

export default RetainerContractModel;
