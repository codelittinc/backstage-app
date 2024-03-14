import { Grid } from "@mui/material";
import { useEffect } from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Autocomplete from "@/components/Autocomplete";

type Props = {
  displayAllSelectOption?: boolean;
  onChange: (statementOfWork: StatementOfWork) => void;
  statementOfWork?: StatementOfWork;
  statementsOfWork: StatementOfWork[];
};

const defaultStatementOfWork = {
  id: 0,
  name: "All",
};

const KEY = "statementOfWork";
const StatementOfWorkFilter = ({
  statementOfWork,
  statementsOfWork,
  displayAllSelectOption = true,
  onChange,
}: Props) => {
  const statementsOfWorkFilterOptions = [
    defaultStatementOfWork,
    ...[statementsOfWork || []],
  ].flat();

  const { setCustomParams } = useQueryParamController([
    {
      key: KEY,
      defaultValue: defaultStatementOfWork.id,
    },
  ]);

  const updateStatementOfWorkQuery = (statementOfWorkId: number) => {
    setCustomParams([
      {
        key: KEY,
        value: statementOfWorkId,
      },
    ]);
  };

  useEffect(() => {
    if (statementsOfWork?.length > 0 && !statementOfWork) {
      if (displayAllSelectOption) {
        onChange(statementsOfWorkFilterOptions[0] as StatementOfWork);
      } else {
        onChange(statementsOfWork[0]);
      }
    }
  }, [statementsOfWork]);

  useEffect(() => {
    if (statementOfWork) {
      updateStatementOfWorkQuery(statementOfWork.id as number);
    }
  }, [statementOfWork]);

  if (!statementOfWork) {
    return null;
  }
  return (
    <Grid item sm={2} ml={1}>
      <Autocomplete
        label="Statement of Work"
        value={statementOfWork}
        options={statementsOfWorkFilterOptions}
        onChange={onChange}
        getOptionLabel={(value: StatementOfWork) => value.name}
        isOptionEqualToValue={(
          option: StatementOfWork,
          value: StatementOfWork
        ) => option.id === value.id}
      />
    </Grid>
  );
};
export default StatementOfWorkFilter;
