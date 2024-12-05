import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Card, Grid, IconButton, Typography } from "@mui/material";

import useSkillsController from "@/app/_presenters/controllers/useSkillsController";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Loading from "@/components/Loading";

import SkillForm from "./_presenters/components/SkillForm";
import SkillModal from "./_presenters/components/SkillModal";

interface Props {
  userId: string | number;
}

function Skills({ userId }: Props): JSX.Element {
  const {
    skills,
    isLoading,
    addNewSkillForm,
    onSubmit,
    handleSubmit,
    fields,
    remove,
    control,
  } = useSkillsController(userId);
  return (
    <Card id="skill-info" sx={{ overflow: "visible" }}>
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={3}
      >
        <Typography variant="h5">Skills</Typography>
        <SkillModal />
      </Box>
      {isLoading || !skills ? (
        <Loading />
      ) : (
        <Form hideCancelButton>
          <Grid container spacing={0.5} rowSpacing={2}>
            {fields.map((us, index) => (
              <SkillForm
                key={`${us.skillId}-${index}`}
                userSkill={us}
                skills={skills}
                control={control}
                index={index}
                remove={remove}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            justifyContent={"flex-start"}
            pt={3}
          >
            <IconButton
              aria-label="add new skill form"
              color="success"
              onClick={addNewSkillForm}
            >
              <AddCircleIcon /> <Box pl={1}>add new skill</Box>
            </IconButton>
          </Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"flex-end"} pt={3}>
            <Button
              variant="gradient"
              color="info"
              size="small"
              onClick={() => handleSubmit(onSubmit)()}
            >
              Save
            </Button>
          </Grid>
        </Form>
      )}
    </Card>
  );
}

export default Skills;
