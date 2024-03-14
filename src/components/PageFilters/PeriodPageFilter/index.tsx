import { Grid } from "@mui/material";

import DateRangePicker from "@/components/DateRangePicker";

type Props = {
  endDate: string;
  onChange: (startDate: Date, endDate: Date) => void;
  startDate: string;
};

const PeriodPageFilter = ({ startDate, endDate, onChange }: Props) => {
  return (
    <Grid item xs={2} ml={1}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={onChange}
        label="Period"
      />
    </Grid>
  );
};

export default PeriodPageFilter;
