import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Button, Icon } from "@mui/material";
import { useRouter } from "next/navigation";

import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import routes from "@/routes";


type Props = {
  assignments: Assignment[];
  project: Project;
  requirements: Requirement[];
};

const colors = {
  "Project Manager": {
    font: "#2d77e5",
    background: "rgba(45,119,229,0.12)",
  },
  Engineer: {
    font: "#945af2",
    background: "rgba(148,90,242,0.12)",
  },
  "Quality Assurance Specialist": {
    font: "white",
    background: "green",
  },
  Designer: {
    font: "#f768c6",
    background: "rgba(247,104,198,0.12)",
  },
  "UX Researcher": {
    font: "#fc9723",
    background: "rgba(252,151,35,0.12)",
  },
  "Product Manager": {
    font: "#f768c6",
    background: "rgba(247,104,198,0.12)",
  },
};

const RequirementsTable = ({ requirements, assignments, project }: Props) => {
  const { professions, isLoading: isLoadingProfessions } =
    useProfessionsController();
  const router = useRouter();

  const { users } = useUsersController();

  if (isLoadingProfessions) {
    return <Loading />;
  }

  type RequirementOrAssignment = Requirement | Assignment;
  let combinedList: RequirementOrAssignment[] = [];

  const sortedRequirements = requirements.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  sortedRequirements.forEach((requirement: Requirement) => {
    combinedList.push(requirement); // Add the requirement to the result list
    const matchingAssignments = assignments.filter(
      (assignment) => assignment.requirementId === requirement.id
    );
    combinedList = combinedList.concat(matchingAssignments);
  });

  const columns = [
    {
      Header: "Type",
      accessor: "fullName",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { professionId },
        } = row;

        const profession = professions?.find(
          (profession) => profession.id === professionId
        );

        if (profession) {
          const color = colors[profession.name];

          return (
            <div
              style={{
                backgroundColor: color?.background,
                color: color?.font,
                padding: "4px",
                borderRadius: "6px",
              }}
            >
              {profession.name}
            </div>
          );
        }

        const {
          original: { userId },
        } = row;

        const user = users?.find((user) => user.id === userId);
        return user?.fullName;
      },
    },
    {
      Header: "Start date",
      accessor: "startDate",
      width: "20%",
      Cell: ({ value }: { value: string }) => {
        return formatDateToMonthDayYear(value);
      },
    },
    {
      Header: "End date",
      accessor: "endDate",
      width: "20%",
      Cell: ({ value }: { value: string }) => {
        return formatDateToMonthDayYear(value);
      },
    },
    {
      Header: "Coverage",
      accessor: "coverage",
      width: "20%",
    },
    {
      Header: "",
      accessor: "addAssignment",
      width: "5%",
      Cell: ({ row }: any) => {
        const {
          original: { statementOfWorkId, id, requirementId },
        } = row;

        if (requirementId) {
          return null;
        }

        const path = routes.assignmentPath(
          "new",
          id,
          statementOfWorkId,
          project.id!
        );

        return (
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              router.push(path);
            }}
          >
            <PersonAddAlt1Icon />
          </Button>
        );
      },
    },

    {
      Header: "",
      accessor: "edit",
      width: "5%",
      Cell: ({ row }: any) => {
        const {
          original: { id, statementOfWorkId, requirementId },
        } = row;

        let path = routes.requirementPath(id, statementOfWorkId, project.id!);

        if (requirementId) {
          const statementId = requirements.find(
            (req) => req.id === requirementId
          )?.statementOfWorkId;
          path = routes.assignmentPath(
            id,
            requirementId,
            statementId!,
            project.id!
          );
        }

        return (
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              router.push(path);
            }}
          >
            <Icon>edit</Icon>
          </Button>
        );
      },
    },
  ];

  const data = {
    rows: combinedList,
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

export default RequirementsTable;
