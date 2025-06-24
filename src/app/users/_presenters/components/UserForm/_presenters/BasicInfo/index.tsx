import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useForm, useWatch } from "react-hook-form";

import Profession from "@/app/_domain/interfaces/Profession";
import { User } from "@/app/_domain/interfaces/User";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import Loading from "@/components/Loading";
import ProtectedComponent from "@/components/ProtectedComponent";
import Typography from "@/components/Typography";
import { abilities, targets } from "@/permissions";

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
  profession_id: professions.length > 0 ? professions[0].id : undefined,
  active: true,
  rehireable: false,
  servicesIdentifiers: [],
  seniority: "Senior",
  contractType: "Salary",
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
          <AutocompleteController
            label="Profession"
            name="professionId"
            options={professions}
            control={control}
            required
            withObjectValue={false}
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
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
        <ProtectedComponent ability={abilities.view} target={targets.users}>
          <Grid item xs={12} md={6}>
            <SwitchController
              name="rehireable"
              label="Rehireable"
              control={control}
            />
          </Grid>
        </ProtectedComponent>
        {internal && (
          <>
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
