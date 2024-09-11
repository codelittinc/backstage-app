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
  const formatDateAsUTC = (dateString: string) =>
    new Date(`${dateString}T03:00:00Z`);

  return (
    <DatePicker
      label={label}
      value={[formatDateAsUTC(startDate), formatDateAsUTC(endDate)]}
      onChange={(e: Array<Date>) => {
        if (e.length === 2) {
          onDateRangeChange?.(e[0], e[1]);
        }
      }}
    />
  );
};

export default DateRangePicker;
