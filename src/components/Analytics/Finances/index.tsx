import { Grid } from "@mui/material";
import { addDays, startOfWeek, subWeeks } from "date-fns";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Box from "@/components/Box";
import PieChart from "@/components/Charts/PieChart";
import DataTable from "@/components/DataTable";
import DatePicker from "@/components/DatePicker";
import Loading from "@/components/Loading";

import useFinancesController from "./_presenters/controllers/useFinancesController";

type Props = {
  project?: Project;
};

const lastWeekMonday = startOfWeek(subWeeks(new Date(), 1), {
  weekStartsOn: 0,
});
const lastWeekFriday = addDays(lastWeekMonday, 6);

const formatCurrency = (value: number) => {
  return `$${new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(value)}`;
};

const formatHours = (value: number) => value.toFixed(1);

const Finances = ({ project }: Props) => {
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

  const { finances, isLoading } = useFinancesController(
    startDateFilter,
    endDateFilter,
    project
  );

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: "20%",
    },
    {
      Header: "Worked income",
      accessor: "executed_income",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatCurrency(value);
      },
    },
    {
      Header: "Expected income",
      accessor: "expected_income",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatCurrency(value);
      },
    },
    {
      Header: "Worked hours",
      accessor: "executed_hours",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatHours(value);
      },
    },
    {
      Header: "Expected hours",
      accessor: "expected_hours",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatHours(value);
      },
    },
    {
      Header: "PTO hours",
      accessor: "paid_time_off_hours",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatHours(value);
      },
    },
    {
      Header: "Cost",
      accessor: "executed_cost",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatCurrency(value);
      },
    },
  ];
  const rows = finances;
  const totalExpected = rows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.expected_income,
    0
  );

  const totalWorked = rows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.executed_income,
    0
  );

  const pieChartData = {
    labels: [
      `Expected ${formatCurrency(totalExpected)}`,
      `Executed ${formatCurrency(totalWorked)}`,
    ],
    datasets: {
      label: "",
      backgroundColors: ["error", "info"],
      data: [
        Math.max(100 - (totalWorked / totalExpected) * 100, 0),
        (totalWorked / totalExpected) * 100,
      ],
    },
  };

  const tableData = {
    columns,
    rows,
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
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={7}>
          <PieChart
            icon={{ color: "success", component: "donut_small" }}
            title="Billings VS bookings"
            description=""
            chart={pieChartData}
          />
        </Grid>
        <Grid item xs={12}>
          <DataTable table={tableData} entriesPerPage={false} canSearch />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Finances;
