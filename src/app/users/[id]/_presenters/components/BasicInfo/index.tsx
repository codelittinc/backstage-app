import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "@/components/FormField";
import Autocomplete from "@/components/Autocomplete";
import Profession from "@/app/_domain/interfaces/Profession";
import User from "@/app/_domain/interfaces/User";
import Button from "@/components/Button";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import Loading from "@/components/Loading";
import ProtectedComponent from "@/components/ProtectedComponent";
import { abilities, targets } from "@/permissions";

interface Props {
  user: User;
  onSave: (user: User) => void;
  onChange: (user: User) => void;
}

function BasicInfo({ user, onSave, onChange }: Props): JSX.Element {
  const { professions, isLoading } = useProfessionsController();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              placeholder="your.name@codelitt.com"
              value={user?.email}
              onChange={({ target: { value } }) => {
                onChange({
                  ...user,
                  email: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              label="First Name"
              placeholder="Alec"
              value={user?.firstName}
              onChange={({ target: { value } }) => {
                onChange({
                  ...user,
                  firstName: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              label="Last Name"
              placeholder="Thompson"
              value={user?.lastName}
              onChange={({ target: { value } }) => {
                onChange({
                  ...user,
                  lastName: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  isOptionEqualToValue={(
                    option: Profession,
                    value: Profession
                  ) => option.id == value.id}
                  label="Profession"
                  value={user?.profession}
                  getOptionLabel={(option) => option.name}
                  options={professions!}
                  onChange={(value: Profession) => {
                    onChange({
                      ...user,
                      profession: value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label="Seniority"
                  value={user?.seniority}
                  options={["Junior", "Intern", "Midlevel", "Senior"]}
                  onChange={(value: string) => {
                    onChange({
                      ...user,
                      seniority: value,
                    });
                  }}
                />
              </Grid>
              <ProtectedComponent
                ability={abilities.change}
                target={targets.financial}
              >
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    label="Contract type"
                    value={user?.contractType}
                    defaultValue="Hourly"
                    options={["Salary", "Houly"]}
                    onChange={(value: string) => {
                      onChange({
                        ...user,
                        contractType: value,
                      });
                    }}
                  />
                </Grid>
              </ProtectedComponent>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Country"
              placeholder="Australia"
              value={user?.country || ""}
              onChange={({ target: { value } }) => {
                onChange({
                  ...user,
                  country: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <Box
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <Button
                variant="gradient"
                color="dark"
                size="small"
                onClick={() => onSave(user)}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
