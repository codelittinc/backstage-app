import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "@/components/FormField";
import Autocomplete from "@/components/Autocomplete";
import useUserFormController from "../../controllers/useUserFormController";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import Profession from "@/app/_domain/interfaces/Profession";
import User from "@/app/_domain/interfaces/User";
import Button from "@/components/Button";

function BasicInfo(): JSX.Element {
  const { id } = useParams();
  const { user, professions, isLoading, onSave } = useUserFormController(
    id as string
  );
  const defaultUserValues = {
    profession: professions ? professions![0] : undefined,
    seniority: "Senior",
    contractType: "Salary",
  };

  const [editUser, setEditUser] = useState(user as User);

  useEffect(() => {
    setEditUser({
      ...defaultUserValues,
      ...user,
    } as User);
  }, [user]);

  if (isLoading || !editUser?.id) {
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
              value={editUser?.email}
              onChange={({ target: { value } }) => {
                setEditUser({
                  ...editUser,
                  email: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              label="First Name"
              placeholder="Alec"
              value={editUser?.firstName}
              onChange={({ target: { value } }) => {
                setEditUser({
                  ...editUser,
                  firstName: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              label="Last Name"
              placeholder="Thompson"
              value={editUser?.lastName}
              onChange={({ target: { value } }) => {
                setEditUser({
                  ...editUser,
                  lastName: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label="Profession"
                  value={editUser?.profession}
                  getOptionLabel={(option) => option.name}
                  options={professions!}
                  onChange={(value: Profession) => {
                    setEditUser({
                      ...editUser,
                      profession: value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label="Seniority"
                  value={editUser?.seniority}
                  options={["Junior", "Intern", "Midlevel", "Senior"]}
                  onChange={(value: string) => {
                    setEditUser({
                      ...editUser,
                      seniority: value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label="Contract type"
                  value={editUser?.contractType}
                  defaultValue="Hourly"
                  options={["Salary", "Houly"]}
                  onChange={(value: string) => {
                    setEditUser({
                      ...editUser,
                      contractType: value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Country"
              placeholder="Australia"
              value={editUser?.country || ""}
              onChange={({ target: { value } }) => {
                setEditUser({
                  ...editUser,
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
                onClick={() => onSave(editUser)}
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
