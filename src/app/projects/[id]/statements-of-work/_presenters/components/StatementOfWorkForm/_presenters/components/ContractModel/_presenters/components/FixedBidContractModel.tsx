import { Grid } from "@mui/material";
import { Control } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";

interface Props {
  control: Control<StatementOfWork>;
}

const FixedBidContractModel = ({ control }: Props) => {
  return (
    <Grid item xs={12}>
      <SwitchController
        name="contractModel.fixedTimeline"
        label="Fixed timeline"
        control={control}
      />
    </Grid>
  );
};

export default FixedBidContractModel;
