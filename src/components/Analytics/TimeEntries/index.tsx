import { Grid } from "@mui/material";
import { addDays, startOfWeek, subWeeks } from "date-fns";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Box from "@/components/Box";
import HorizontalBarChart from "@/components/Charts/HorizontalBarChart";
import PieChart from "@/components/Charts/PieChart";
import DatePicker from "@/components/DatePicker";
import Loading from "@/components/Loading";

import useTimeEntriesController from "./_presenters/controllers/useTimeEntriesController";

type Props = {
  project?: Project;
};

const lastWeekMonday = startOfWeek(subWeeks(new Date(), 1), {
  weekStartsOn: 0,
});
const lastWeekFriday = addDays(lastWeekMonday, 6);

const TimeEntries = ({ project }: Props) => {
  const { paramValue: startDateFilter, setParamValue: setStartDateFilter } =
    useQueryParamController("startDate", lastWeekMonday.toISOString());

  const { paramValue: endDateFilter, setParamValue: setEndDateFilter } =
    useQueryParamController("endDate", lastWeekFriday.toISOString());

  const updateEndDateFilter = (value: Date) => {
    setEndDateFilter(value.toDateString());
  };

  const updateStartDateFilter = (value: Date) => {
    setStartDateFilter(value.toDateString());
  };

  const colors = ["success", "info", "dark", "warning", "error", "secondary"];

  const { timeEntries: data, isLoading } = useTimeEntriesController(
    startDateFilter,
    endDateFilter,
    !project?.id,
    project
  );

  if (isLoading) {
    return <Loading />;
  }

  const cleanedData = {
    ...data,
    datasets: data.datasets.slice(0, 6).map((dataset, index) => ({
      ...dataset,
      color: colors[index],
    })),
  };

  const worked = data.datasets[0].data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const paidTimeOff = data.datasets[1].data.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const sickLeave = data.datasets[3].data.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const overDelivered = data.datasets[2].data.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const missing = data.datasets[4].data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const expected = data.datasets[6].data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const totalBilled = worked + overDelivered;
  const totalExpected = expected;

  const totalPercentage = Math.round((totalBilled / totalExpected) * 100);

  const pieChartData = {
    labels: ["Billings", "Missing bookings"],
    datasets: {
      label: "Projects",
      backgroundColors: ["success", "error"],
      data: [totalPercentage, 100 - totalPercentage],
    },
  };

  const totalHours = worked + paidTimeOff + sickLeave + overDelivered + missing;

  const breakdownPieChartData = {
    labels: ["Worked", "Paid time off", "Sick leave", "Missing"],
    datasets: {
      label: "In %",
      backgroundColors: ["success", "info", "warning", "error"],
      data: [
        Math.round(((worked + overDelivered) / totalHours) * 100),
        Math.round((paidTimeOff / totalHours) * 100),
        Math.round((sickLeave / totalHours) * 100),
        Math.round((missing / totalHours) * 100),
      ],
    },
  };

  return (
    <Box>
      <Grid container mb={3} mt={3}>
        <Grid item mr={2}>
          <DatePicker
            label="Start date"
            value={[new Date(startDateFilter)]}
            onChange={(e: Array<Date>) => {
              updateStartDateFilter(e[0]);
            }}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="End date"
            value={new Date(endDateFilter)}
            onChange={(e: Array<Date>) => {
              updateEndDateFilter(e[0]);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} md={12} mt={3}>
        <Grid item xs={12} md={6}>
          <PieChart
            icon={{ color: "success", component: "donut_small" }}
            title="Billings VS Bookings"
            description="Based on the project requirements"
            chart={pieChartData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChart
            icon={{ color: "success", component: "donut_small" }}
            title="Time breakdown"
            description="Based on time entries and time off requests"
            chart={breakdownPieChartData}
          />
        </Grid>
        <Grid item xs={12}>
          <HorizontalBarChart
            title="Time entries in hours"
            chart={cleanedData}
            height={"40rem"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default TimeEntries;
