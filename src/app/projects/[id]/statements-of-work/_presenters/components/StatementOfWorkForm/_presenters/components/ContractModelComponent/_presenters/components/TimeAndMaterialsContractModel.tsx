import { Grid } from "@mui/material";
import { Control } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import AutocompleteController, {
  Option,
} from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";

interface Props {
  control: Control<StatementOfWork>;
}

const limitByOptions = [
  { id: "contract_size", name: "Contract Size" },
  { id: "hours", name: "Number of hours" },
];

const TimeAndMaterialsContractModel = ({ control }: Props) => {
  return (
    <>
      <Grid item xs={12}>
        <SwitchController
          name="contractModel.allowOverflow"
          label="Allow Overflow"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          name="contractModel.hoursAmount"
          label="Hours Amount"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <AutocompleteController
          label="Limit by"
          name="contractModel.limitBy"
          options={limitByOptions}
          control={control}
          withObjectValue={false}
          required
        />
      </Grid>
    </>
  );
};

export default TimeAndMaterialsContractModel;
