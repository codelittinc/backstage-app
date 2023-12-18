import DatePicker from "../DatePicker";

interface Props {
  endDate: string;
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
  startDate: string;
}

const DateRangePicker = ({ onDateRangeChange, startDate, endDate }: Props) => {
  return (
    <DatePicker
      label="Period"
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
