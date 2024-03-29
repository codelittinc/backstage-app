import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { User } from "@/app/_domain/interfaces/User";
import {
  formatDateToMonthDay,
  formatDateToMonthDayYear,
  getDaysBetweenTwoDates,
  getFirstDayOfTheWeek,
  getLastDayOfTheWeek,
} from "@/app/_presenters/utils/date";
import DataTable from "@/components/DataTable";
import Typography from "@/components/Typography";

import TableCell from "./_presenters/components/TableCell";
import { TimeEntry } from "../../domain/types/TimeEntry";

type Props = {
  assignments: Assignment[];
  date: Date;
  onChange: () => void;
  projects: Project[];
  statementsOfWork: StatementOfWork[];
  timeEntries: TimeEntry[];
  users: User[];
  showWeekends: boolean;
};

const TimesheetsTable = ({
  users,
  assignments,
  projects,
  statementsOfWork,
  date,
  timeEntries,
  onChange,
  showWeekends,
}: Props) => {
  type StatementOrAssignment = StatementOfWork | Assignment;
  let combinedList: StatementOrAssignment[] = [];

  statementsOfWork.forEach((sow: StatementOrAssignment) => {
    combinedList.push(sow);
    const matchingAssignments = assignments.filter(
      (assignment: Assignment) => assignment.statementOfWorkId === sow.id
    );

    const assignmentsWithSow = matchingAssignments.map((assignment) => {
      return {
        ...assignment,
        statementOfWork: sow,
      };
    });
    combinedList = combinedList.concat(assignmentsWithSow);
  });

  const monday = getFirstDayOfTheWeek(date);
  const saturday = getLastDayOfTheWeek(date);

  let dates = getDaysBetweenTwoDates(monday, saturday);
  if (!showWeekends) {
    dates = dates.filter((date) => date.getDay() !== 0 && date.getDay() !== 6);
  }

  const processedData = combinedList.map((item: StatementOrAssignment) => {
    return {
      projectId: (item as StatementOfWork).projectId,
      userId: (item as Assignment).userId,
      statementsOfWork: (item as any).statementOfWork,
      sunday: dates[0],
      monday: dates[1],
      tuesday: dates[2],
      wednesday: dates[3],
      thursday: dates[4],
      friday: dates[5],
      saturday: dates[6],
    };
  });

  const getColumnHeader = (date: Date) => {
    const acessor = formatDateToMonthDayYear(date);
    const Header = (
      <>
        {formatDateToMonthDay(date)}
        <br /> {date.toLocaleDateString("en-US", { weekday: "long" })}
      </>
    );

    return {
      Header: Header,
      accessor: acessor,
      width: "auto",
      align: "center",
      Cell: ({ row }: any) => {
        const { original } = row;
        const { userId, statementsOfWork } = original;

        return (
          <TableCell
            date={new Date(date)}
            assignments={assignments}
            timeEntries={timeEntries}
            userId={userId}
            statementOfWork={statementsOfWork}
            onChange={onChange}
          />
        );
      },
    };
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: "auto",
      Cell: ({ row }: any) => {
        const {
          original: { projectId },
        } = row;

        if (projectId) {
          return (
            <Typography variant="h6">
              {projects.find((project) => project.id === projectId)?.name}
            </Typography>
          );
        }

        const {
          original: { userId },
        } = row;

        const user = users?.find((user) => user.id === userId);
        return user?.fullName;
      },
    },
    ...dates.map((date) => getColumnHeader(date)),
  ];

  const data = {
    rows: processedData,
    columns: columns,
  };

  return (
    <DataTable
      table={data}
      withPagination={false}
      showTotalEntries={false}
      isSorted={false}
    />
  );
};

export default TimesheetsTable;
