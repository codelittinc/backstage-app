import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

type Props = {
  statementsOfWork: StatementOfWork[];
  selectedStatementOfWork: StatementOfWork;
  onChange: (sow: StatementOfWork) => void;
};

const getSowName = (sow: StatementOfWork) =>
  `${sow.name}: ${formatDateToMonthDayYear(
    sow.startDate
  )} - ${formatDateToMonthDayYear(sow.endDate)}`;

const StatementOfWorkAutoComplete = ({
  statementsOfWork,
  selectedStatementOfWork,
  onChange,
}: Props) => {
  return (
    <Box>
      <Typography>Statement of work</Typography>
      <Autocomplete
        options={statementsOfWork}
        value={selectedStatementOfWork}
        onChange={onChange}
        getOptionLabel={getSowName}
      />
    </Box>
  );
};

export default StatementOfWorkAutoComplete;
