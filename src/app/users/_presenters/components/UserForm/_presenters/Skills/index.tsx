import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { User } from "@/app/_domain/interfaces/User";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import useSkillsController from "./_presenters/controllers/useSkillsController";

interface Props {
  onSave: (user: User) => void;
  user: User;
}

function Skills({ user, onSave }: Props): JSX.Element {
  const { skills, isLoading } = useSkillsController();

  console.log(skills, isLoading);

  return (
    <Card id="accounts">
      <Box p={3} lineHeight={1}>
        <Box mb={1}>
          <Typography variant="h5">Experience</Typography>
        </Box>
        <Typography variant="button" color="text">
          Here you can tell us a bit more about your experience.
        </Typography>
      </Box>
      <Box pt={2} pb={3} px={3}>
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
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
}

export default Skills;
