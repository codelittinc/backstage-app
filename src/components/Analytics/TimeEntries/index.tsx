import { Grid } from "@mui/material";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import { getLastSaturday, getLastSunday } from "@/app/_presenters/utils/date";
import Box from "@/components/Box";
import HorizontalBarChart from "@/components/Charts/HorizontalBarChart";
import PieChart from "@/components/Charts/PieChart";
import VerticalBarChart from "@/components/Charts/VerticalBarChart";
import DateRangePicker from "@/components/DateRangePicker";
import Loading from "@/components/Loading";

import useTimeEntriesController from "./_presenters/controllers/useTimeEntriesController";

type Props = {
  project?: Project;
};

const START_DATE_KEY = "startDate";
const END_DATE_KEY = "endDate";

const TimeEntries = ({ project }: Props) => {
  const defaultStartDate = getLastSunday();
  const defaultEndDate = getLastSaturday();

  const { setCustomParams, getCustomParamValue } = useQueryParamController([
    {
      key: START_DATE_KEY,
      defaultValue: defaultStartDate.toISOString(),
    },
    {
      key: END_DATE_KEY,
      defaultValue: defaultEndDate.toISOString(),
    },
  ]);

  const updateDateFilters = (startDate: Date, endDate: Date) => {
    setCustomParams([
      {
        key: START_DATE_KEY,
        value: startDate.toISOString(),
      },
      {
        key: END_DATE_KEY,
        value: endDate.toISOString(),
      },
    ]);
  };

  const startDateFilter = getCustomParamValue(
    START_DATE_KEY,
    defaultStartDate.toISOString()
  ) as string;

  const endDateFilter = getCustomParamValue(
    END_DATE_KEY,
    defaultEndDate.toISOString()
  ) as string;

  const colors = ["success", "info", "dark", "warning", "error", "secondary"];

  const { timeEntries: data, isLoading } = useTimeEntriesController(
    startDateFilter,
    endDateFilter,
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

  const errands = data.datasets[5].data.reduce((accumulator, currentValue) => {
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
      data: [totalPercentage, Math.max(100 - totalPercentage, 0)],
    },
  };
  const breakdownBarChartData = {
    labels: ["Hours"],
    datasets: [
      {
        label: "Total worked",
        data: [Math.round(worked) + Math.round(overDelivered)],
        color: "primary",
      },
      {
        label: "Expected worked",
        data: [Math.round(worked)],
        color: colors[0],
      },
      {
        label: "Paid time off",
        data: [Math.round(paidTimeOff)],
        color: colors[1],
      },
      {
        label: "Over delivered",
        data: [Math.round(overDelivered)],
        color: colors[2],
      },
      {
        label: "Sick leave",
        data: [Math.round(sickLeave)],
        color: colors[3],
      },
      {
        label: "Missing",
        data: [Math.round(missing)],
        color: colors[4],
      },
      {
        label: "Errands",
        data: [Math.round(errands)],
        color: colors[5],
      },
    ],
  };
  return (
    <Box>
      <Grid container mb={3} mt={3}>
        <Grid item mr={2} xs={2}>
          <DateRangePicker
            startDate={startDateFilter}
            endDate={endDateFilter}
            onDateRangeChange={(startDate, endDate) => {
              updateDateFilters(startDate, endDate);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <PieChart
            icon={{ color: "success", component: "donut_small" }}
            title="Billings VS Bookings"
            description="Based on the project requirements"
            chart={pieChartData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalBarChart
            icon={{ color: "success", component: "donut_small" }}
            title="Time entries in hours"
            chart={breakdownBarChartData}
            height="21rem"
            valueType="number"
            sufix="Hours"
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
