import { Grid } from "@mui/material";
import { useEffect } from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Autocomplete from "@/components/Autocomplete";
import customParamKeys from "@/app/_domain/enums/customParamKeys";

type Props = {
  onChange: (statementOfWork: StatementOfWork) => void;
  statementOfWork?: StatementOfWork;
  statementsOfWork: StatementOfWork[];
};

const defaultStatementOfWork = {
  id: 0,
  name: "All",
};

const StatementOfWorkFilter = ({
  statementOfWork,
  statementsOfWork,
  onChange,
}: Props) => {
  const statementsOfWorkFilterOptions = [
    defaultStatementOfWork,
    ...[statementsOfWork || []],
  ].flat();

  const { setCustomParams, getCustomParamValue } = useQueryParamController();

  const updateStatementOfWorkQuery = (statementOfWorkId: number) => {
    setCustomParams([
      {
        key: customParamKeys.statementOfWorkId,
        value: statementOfWorkId,
      },
    ]);
  };

  useEffect(() => {
    if (statementsOfWork?.length > 0 && !statementOfWork) {
      const statementOfWorkId = getCustomParamValue(
        customParamKeys.statementOfWorkId,
        defaultStatementOfWork.id
      );
      const sow = statementsOfWorkFilterOptions.find(
        (sow) => sow.id === Number(statementOfWorkId)
      );

      onChange(sow as StatementOfWork);
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
