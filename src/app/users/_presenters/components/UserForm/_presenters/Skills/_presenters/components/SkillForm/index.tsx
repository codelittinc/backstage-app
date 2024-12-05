import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Container, Grid, IconButton } from "@mui/material";
import { UseFieldArrayRemove } from "react-hook-form";

import { Skill, UserSkill } from "@/app/_domain/interfaces/Skill";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import Loading from "@/components/Loading";

import useSkillFormController from "../../controllers/useSkillFormController";
import { LAST_APPLIED_YEARS, LEVEL_LIST } from "../../data/utils";

interface Props {
  control: any;
  index: number;
  remove: UseFieldArrayRemove;
  skills?: Skill[] | null;
  userSkill?: UserSkill;
}

function SkillForm({
  userSkill,
  control,
  skills,
  remove,
  index,
}: Props): JSX.Element {
  const { selectedSkill } = useSkillFormController({
    skills,
    userSkill,
  });

  console.log(selectedSkill, skills, userSkill);
  if (!skills) {
    return <Loading />;
  }
  return (
    <Container sx={{ width: "100%", display: "flex", paddingBottom: "5px" }}>
      <Grid container rowSpacing={1} columnSpacing={1} sx={{ marginLeft: 0 }}>
        <Grid item xs={11} sm={3} md={3}>
          <AutocompleteController
            name={`userSkills.${index}.skillId`}
            control={control}
            defaultValue={selectedSkill || null}
            label="Technology"
            options={
              skills as {
                id: number | string;
                name: string;
              }[]
            }
            required
            withObjectValue={false}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <AutocompleteController
            name={`userSkills.${index}.lastAppliedYear`}
            control={control}
            label="Last Applied Year"
            options={LAST_APPLIED_YEARS}
            required
            getOptionLabel={(option: Number) => {
              return option.toString();
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextInputController
            label="Year of Experience"
            name={`userSkills.${index}.yearsOfExperience`}
            required
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={8} sm={3} md={3}>
          <AutocompleteController
            name={`userSkills.${index}.level`}
            control={control}
            label="Level"
            options={LEVEL_LIST}
            required
            getOptionLabel={(option: String) => {
              return option.charAt(0).toUpperCase() + option.slice(1);
            }}
          />
        </Grid>
      </Grid>
      <div
        style={{
          width: "45px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingTop: "8px",
        }}
      >
        <IconButton
          aria-label="remove skill form"
          color="primary"
          onClick={() => remove(index)}
          sx={{ justifyContent: "flex-end", padding: 0 }}
        >
          <RemoveCircleIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default SkillForm;
