import { Grid, Card, Box, Typography as MuiTypography } from "@mui/material";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";
import { User } from "@/app/_domain/interfaces/User";
import useUserHistoryController from "../../controllers/useUserHistoryController";

type Props = {
  user: User;
};

const UserHistory = ({ user }: Props) => {
  const { userProfile, projectHistory, userSkills, isLoading } =
    useUserHistoryController(user);

  if (isLoading) {
    return <Loading />;
  }

  const profileFields = [
    { label: "Full Name", value: userProfile.fullName },
    { label: "Email", value: userProfile.email },
    { label: "Country", value: userProfile.country },
    { label: "Contract Type", value: userProfile.contractType },
    { label: "Seniority", value: userProfile.seniority },
    { label: "Type", value: userProfile.internal ? "Internal" : "External" },
    { label: "Status", value: userProfile.active ? "Active" : "Inactive" },
  ];

  const projectHistoryColumns = [
    {
      Header: "Customer",
      accessor: "customer",
      width: "20%",
    },
    {
      Header: "Project",
      accessor: "projectName",
      width: "20%",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
      width: "15%",
      Cell: ({ value }: { value: string }) => formatDateToMonthDayYear(value),
    },
    {
      Header: "End Date",
      accessor: "endDate",
      width: "15%",
      Cell: ({ value }: { value: string }) => formatDateToMonthDayYear(value),
    },
    {
      Header: "Coverage",
      accessor: "coverage",
      width: "15%",
    },
  ];

  const skillsColumns = [
    {
      Header: "Skill",
      accessor: "skill.name",
      width: "30%",
    },
    {
      Header: "Level",
      accessor: "level",
      width: "20%",
    },
    {
      Header: "Years of Experience",
      accessor: "yearsOfExperience",
      width: "20%",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box p={3}>
            <Typography variant="h5" mb={3}>
              Profile Information
            </Typography>
            <Grid container spacing={2}>
              {profileFields.map((field) => (
                <Grid item xs={12} sm={6} md={4} key={field.label}>
                  <MuiTypography variant="subtitle2" color="text.secondary">
                    {field.label}
                  </MuiTypography>
                  <MuiTypography variant="body1">{field.value}</MuiTypography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Box p={3}>
            <Typography variant="h5" mb={3}>
              Project History
            </Typography>
            <DataTable
              table={{
                columns: projectHistoryColumns,
                rows: projectHistory,
              }}
              withPagination={false}
              showTotalEntries={false}
            />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Box p={3}>
            <Typography variant="h5" mb={3}>
              Skills
            </Typography>
            <DataTable
              table={{
                columns: skillsColumns,
                rows: userSkills,
              }}
              withPagination={false}
              showTotalEntries={false}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserHistory;
