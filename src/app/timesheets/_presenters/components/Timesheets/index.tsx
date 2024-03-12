import { Grid } from "@mui/material";
import { useMemo } from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { User } from "@/app/_domain/interfaces/User";
import DatePicker from "@/components/DatePicker";
import Loading from "@/components/Loading";
import PageFilterContainer from "@/components/PageFilterContainer";

import useTimeEntriesController from "../../controllers/useTimeEntriesController";
import { TimeEntry } from "../../domain/types/TimeEntry";
import TimesheetsTable from "../TimesheetsTable";
import Box from "@/components/Box";

type Props = {
  user?: User;
};
const Timesheets = ({ user }: Props) => {
  const {
    date,
    updateDateRangeQuery,
    statementsOfWork = [],
    assignments = [],
    isLoading,
    users = [],
    projects = [],
    timeEntries = [],
    invalidateTimeEntries,
  } = useTimeEntriesController();

  let filteredAssignments = assignments;
  let filteredStatementsOfWork = statementsOfWork;
  let filteredTimeEntries = timeEntries;

  if (user) {
    filteredAssignments = assignments.filter(
      (assignment: Assignment) => assignment.userId === user.id
    );

    filteredStatementsOfWork = statementsOfWork.filter((sow: StatementOfWork) =>
      filteredAssignments.find(
        (assignment: Assignment) => assignment.statementOfWorkId === sow.id
      )
    );

    filteredTimeEntries = timeEntries.filter(
      (timeEntry: TimeEntry) => timeEntry.userId === user.id
    );
  }

  const timesheets = useMemo(
    () => (
      <TimesheetsTable
        users={users}
        assignments={filteredAssignments}
        projects={projects}
        statementsOfWork={filteredStatementsOfWork}
        date={new Date(date)}
        timeEntries={filteredTimeEntries}
        onChange={invalidateTimeEntries}
      />
    ),
    [
      users.length,
      filteredAssignments.length,
      projects.length,
      filteredStatementsOfWork.length,
      date,
      filteredTimeEntries.length,
    ]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (filteredAssignments.length === 0) {
    if (user) {
      return (
        <Box textAlign={"center"}>
          <Box type="span">
            There are no projects assign to you at this moment.{" "}
          </Box>
          <Box type="span">Please talk to your manager.</Box>
        </Box>
      );
    }
    return <Box>No timesheets found</Box>;
  }

  return (
    <>
      <Grid container pb={3}>
        <Grid item xs={12}>
          <PageFilterContainer>
            <Grid item xs={2} ml={1}>
              <DatePicker
                mode="single"
                value={date}
                onChange={(dates: Date[]) => {
                  updateDateRangeQuery(dates[0]);
                }}
                label="Week"
              />
            </Grid>
          </PageFilterContainer>
        </Grid>
      </Grid>
      {timesheets}
    </>
  );
};

export default Timesheets;
