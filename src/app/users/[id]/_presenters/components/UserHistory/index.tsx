import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";
import { User } from "@/app/_domain/interfaces/User";
import useUserHistoryController from "../../controllers/useUserHistoryController";
import RichTextEditor from "../RichTextEditor";
import { Card, Grid } from "@mui/material";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { useCallback, useRef } from "react";

type Props = {
  user: User;
};

const UserHistory = ({ user: initialUser }: Props) => {
  const {
    user,
    isEditing,
    isLoading,
    userProfile,
    projectHistory,
    userSkills,
    startEditing,
    handleUserUpdate,
  } = useUserHistoryController(initialUser);

  const richTextEditorRef = useRef<{ handleSave: () => Promise<void> } | null>(
    null
  );

  const handleFormSubmit = useCallback(async () => {
    if (richTextEditorRef.current) {
      await richTextEditorRef.current.handleSave();
    }
  }, []);

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
      Cell: ({ value }: { value: number }) => `${value}%`,
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
                  <Typography variant="subtitle2" color="text.secondary">
                    {field.label}
                  </Typography>
                  <Typography variant="body1">{field.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Grid>

      {user.history && !isEditing && (
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5">History</Typography>
                <Button
                  onClick={startEditing}
                  variant="gradient"
                  color="dark"
                  size="small"
                >
                  Edit History
                </Button>
              </Box>
              <RichTextEditor
                user={user}
                onSave={handleUserUpdate}
                readOnly={true}
              />
            </Box>
          </Card>
        </Grid>
      )}

      {isEditing && (
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Typography variant="h5" mb={3}>
                Edit History
              </Typography>
              <Form onSave={handleFormSubmit}>
                <Grid item xs={12}>
                  <RichTextEditor
                    ref={richTextEditorRef}
                    user={user}
                    onSave={handleUserUpdate}
                    readOnly={false}
                  />
                </Grid>
              </Form>
            </Box>
          </Card>
        </Grid>
      )}

      {!user.history && !isEditing && (
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">History</Typography>
                <Button variant="outlined" onClick={startEditing} size="small">
                  Add History
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      )}

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
