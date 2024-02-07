import { Grid } from "@mui/material";
import { Control } from "react-hook-form";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import { Option } from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";

interface Props {
  control: Control<StatementOfWork>;
}

const TimeAndMaterialsAtCostContractModel = ({ control }: Props) => {
  const limitByOptions = [
    { id: "contract_size", name: "Contract Size" },
    { id: "hours", name: "Number of hours" },
  ];

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
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <AutocompleteController
          label="Limit by"
          name="contractModel.limitBy"
          options={limitByOptions}
          control={control}
          getOptionLabel={(option: string | { id: string; name: string }) => {
            if (typeof option === "string") {
              return limitByOptions.find((model) => model.id === option)?.name;
            } else {
              return option.name;
            }
          }}
          isOptionEqualToValue={(
            option: { id: string; name: string },
            value: string | { id: string; name: string }
          ) => {
            if (typeof value === "string") {
              return option.id === value;
            } else {
              return option.id == value.id;
            }
          }}
          processSelectedValue={(selectedValue: Option | string) => {
            if (typeof selectedValue === "string") {
              return selectedValue;
            }

            return selectedValue.id;
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputController
          name="contractModel.managementFactor"
          label="Management factor"
          type="number"
          control={control}
        />
      </Grid>
    </>
  );
};

export default TimeAndMaterialsAtCostContractModel;
