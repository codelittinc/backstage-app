import { Grid } from "@mui/material";
import Link from "next/link";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "@/app/_presenters/utils/date";
import { toUSD } from "@/app/_presenters/utils/finances";
import Box from "@/components/Box";
import VerticalBarChart from "@/components/Charts/VerticalBarChart";
import DataTable from "@/components/DataTable";
import DateRangePicker from "@/components/DateRangePicker";
import Loading from "@/components/Loading";
import routes from "@/routes";

import useFinancesController from "./_presenters/controllers/useFinancesController";

type Props = {
  project?: Project;
};

const formatNumber = (value: number) => value.toFixed(1);

const START_DATE_KEY = "startDate";
const END_DATE_KEY = "endDate";
const Finances = ({ project }: Props) => {
  const defaultStartDate = getFirstDayOfCurrentMonth();
  const defaultEndDate = getLastDayOfCurrentMonth();

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
  const { hasPermission, finances, isLoading } = useFinancesController(
    startDateFilter,
    endDateFilter,
    project
  );

  if (!hasPermission) {
    return null;
  }

  if (!startDateFilter || !endDateFilter || isLoading) {
    return <Loading />;
  }

  const projectSpecific = !!project;
  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { name, slug },
        } = row;

        const route = projectSpecific ? routes.userPath : routes.projectPath;
        return <Link href={route(slug)}>{name}</Link>;
      },
    },
    {
      Header: "Worked income",
      accessor: "executed_income",
      width: "10%",
      Cell: ({ value }: any) => {
        return toUSD(value);
      },
    },
    {
      Header: "Expected income",
      accessor: "expected_income",
      width: "10%",
      Cell: ({ value }: any) => {
        return toUSD(value);
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
      Header: "Executed cost",
      accessor: "executed_cost",
      width: "10%",
      Cell: ({ value }: any) => {
        return toUSD(value);
      },
    },
    {
      Header: "Expected cost",
      accessor: "expected_cost",
      width: "10%",
      Cell: ({ value }: any) => {
        return toUSD(value);
      },
    },
  ];

  if (projectSpecific) {
    // remove the income columns as we're unable to calculate them properly
    columns.splice(1, 2);
  }

  const rows = finances.details;

  const totalExpectedIncome = finances.totals.total_expected_income;
  const totalExecutedIncome = finances.totals.total_executed_income;

  const totalExpectedCost = finances.totals.total_expected_cost;

  const totalExecutedCost = finances.totals.total_executed_cost;

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
