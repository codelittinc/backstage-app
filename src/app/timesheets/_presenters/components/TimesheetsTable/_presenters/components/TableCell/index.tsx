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
  assignments: Assignment[];
};

const TableCell = ({
  date,
  timeEntries,
  userId,
  statementOfWork,
  onChange: onChangeCell,
  assignments,
}: Props) => {
  if (!userId) {
    return null;
  }
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

  const canAddHours = !!assignments.find((assignment) => {
    const compareDate = new Date(date).setHours(0, 0, 0, 0);
    const startDate = new Date(assignment.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(assignment.endDate).setHours(0, 0, 0, 0);

    return startDate <= compareDate && endDate >= compareDate;
  });

  return (
    <Box width="100%">
      <FormField
        fullWidth={false}
        label=""
        placeholder={canAddHours ? "0" : "N/A"}
        type="number"
        value={canAddHours ? hours : undefined}
        onChange={onChange}
        required
        onBlur={save}
        disabled={!canAddHours}
      />
    </Box>
  );
};

export default TableCell;
