import DatePicker from "../DatePicker";

interface Props {
  endDate: string;
  label?: string;
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
  startDate: string;
}

const DateRangePicker = ({
  onDateRangeChange,
  startDate,
  endDate,
  label = "Period",
}: Props) => {
  return (
    <DatePicker
      label={label}
      value={[new Date(startDate), new Date(endDate)]}
      onChange={(e: Array<Date>) => {
        if (e.length === 2) {
          onDateRangeChange?.(e[0], e[1]);
        }
      }}
    />
  );
};

export default DateRangePicker;
