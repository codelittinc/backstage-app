import { Grid } from "@mui/material";
import { addDays, startOfWeek, subWeeks } from "date-fns";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Box from "@/components/Box";
import VerticalBarChart from "@/components/Charts/VerticalBarChart";
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

const formatNumber = (value: number) => value.toFixed(1);

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

  const { hasPermission, finances, isLoading } = useFinancesController(
    startDateFilter,
    endDateFilter,
    project
  );

  if (!hasPermission) {
    return null;
  }

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
        return formatNumber(value);
      },
    },
    {
      Header: "Expected hours",
      accessor: "expected_hours",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatNumber(value);
      },
    },
    {
      Header: "PTO hours",
      accessor: "paid_time_off_hours",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatNumber(value);
      },
    },
    {
      Header: "Expected cost",
      accessor: "expected_cost",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatCurrency(value);
      },
    },
    {
      Header: "Executed cost",
      accessor: "executed_cost",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatCurrency(value);
      },
    },
  ];
  const rows = finances;
  const totalExpectedIncome = rows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.expected_income,
    0
  );

  const totalExecutedIncome = rows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.executed_income,
    0
  );

  const totalExpectedCost = rows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.expected_cost,
    0
  );

  const totalExecutedCost = rows.reduce(
    (accumulator, currentValue) => accumulator + currentValue.executed_cost,
    0
  );

  const tableData = {
    columns,
    rows,
  };

  const verticalBarChartData = {
    labels: ["Expected", "Executed"],
    datasets: [
      {
        label: "Cost",
        color: "error",
        data: [totalExpectedCost, totalExecutedCost],
      },
      {
        label: "Revenue",
        color: "success",
        data: [totalExpectedIncome, totalExecutedIncome],
      },
    ],
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
        <Grid item xs={12} md={12}>
          <VerticalBarChart
            icon={{ color: "success", component: "leaderboard" }}
            title="Cost VS Revenue"
            description=""
            chart={verticalBarChartData}
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
