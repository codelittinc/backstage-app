import { Grid } from "@mui/material";
import dayjs from "dayjs";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { TimeEntry } from "@/app/timesheets/_presenters/domain/types/TimeEntry";
import Box from "@/components/Box";
import FormField from "@/components/FormField";
import Input from "@/components/Input";

import useTableCellController from "./_presenters/controllers/useTableCellController";

type Props = {
  date: Date;
  onChange: () => void;
  statementOfWork: StatementOfWork;
  timeEntries: TimeEntry[];
  userId: number;
};

const TableCell = ({
  date,
  timeEntries,
  userId,
  statementOfWork,
  onChange: onChangeCell,
}: Props) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  const timeEntry = timeEntries.find(
    (entry) =>
      entry.userId === userId &&
      entry.statementOfWorkId === statementOfWork?.id &&
      entry.date === formattedDate
  );

  const { onChange, hours, save } = useTableCellController({
    date: formattedDate,
    timeEntry: timeEntry,
    userId,
    statementOfWork,
    onChangeCell,
  });

  if (!userId) {
    return;
  }

  return (
    <Box width="100%">
      <FormField
        fullWidth={false}
        label=""
        placeholder="0"
        type="number"
        value={hours}
        onChange={onChange}
        required
        onBlur={save}
      />
    </Box>
  );
};

export default TableCell;
