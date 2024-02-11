import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { User } from "@/app/_domain/interfaces/User";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import Box from "@/components/Box";
import Loading from "@/components/Loading";
import ProtectedComponent from "@/components/ProtectedComponent";
import Typography from "@/components/Typography";
import { abilities, targets } from "@/permissions";
import { useForm, useWatch } from "react-hook-form";
import Form from "@/components/Form";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import Profession from "@/app/_domain/interfaces/Profession";

interface Props {
  onSave: (user: User) => void;
  user?: User;
}

const getDefaultUser = (professions: Profession[]) => ({
  email: "",
  firstName: "",
  lastName: "",
  country: "",
  fullName: "",
  internal: false,
  googleId: "",
  imageUrl: "",
  profession: professions ? professions[0] : undefined,
  active: true,
});

function BasicInfo({ user, onSave }: Props): JSX.Element {
  const { professions, isLoading } = useProfessionsController();

  const defaultValues = mergeObjects(
    getDefaultUser(professions || []),
    user || {}
  );

  const { handleSubmit, control } = useForm<User>({
    defaultValues,
  });

  const internal = useWatch({ control, name: "internal" });
  if (isLoading || !professions) {
    return <Loading />;
  }

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Form onSave={() => handleSubmit(onSave)()}>
        <Grid item xs={12} md={6}>
          <TextInputController
            label="First name"
            name="firstName"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputController
            label="Last name"
            name="lastName"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputController
            label="Email"
            placeholder="email@codelitt.com"
            name="email"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchController name="active" label="Active" control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchController
            name="internal"
            label="Internal user?"
            control={control}
          />
        </Grid>
        {internal && (
          <>
            <Grid item xs={12} md={6}>
              <AutocompleteController
                label="Profession"
                name="profession"
                options={professions}
                control={control}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AutocompleteController
                label="Seniority"
                name="seniority"
                options={["Junior", "Intern", "Midlevel", "Senior"]}
                control={control}
                required
              />
            </Grid>
            <ProtectedComponent
              ability={abilities.change}
              target={targets.finances}
            >
              <Grid item xs={12} sm={6}>
                <AutocompleteController
                  label="Contract type"
                  name="contractType"
                  options={["Salary", "Houly"]}
                  control={control}
                  required
                />
              </Grid>
            </ProtectedComponent>
            <Grid item xs={12} md={6}>
              <TextInputController
                label="Country"
                name="country"
                placeholder="Australia"
                control={control}
                required
              />
            </Grid>
          </>
        )}
      </Form>
    </Card>
  );
}

export default BasicInfo;
