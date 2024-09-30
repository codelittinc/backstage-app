import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import skillLevelKeys from '@/app/_domain/enums/skillLevelKeys';
import { UserSkill } from '@/app/_domain/interfaces/Skill';
import useSkillsController from '@/app/_presenters/controllers/useSkillsController';
import Button from '@/components/Button';
import Form from '@/components/Form';
import Loading from '@/components/Loading';

import SkillForm from './_presenters/components/SkillForm';
import useUserSkillsController from './_presenters/controllers/useUserSkillsController';

interface Props {
  userId: string | number;
}

const defaultUserSkill: UserSkill = {
  lastAppliedYear: 2010,
  level: skillLevelKeys.Beginner,
  yearsOfExperience: 0,
  skillId: undefined,
  userId: undefined,
};

function Skills({ userId }: Props): JSX.Element {
  const { skills, isLoading } = useSkillsController();
  const { userSkills: currentUserSkills, onSave } =
    useUserSkillsController(userId);
  const { control, handleSubmit, reset } = useForm<{ userSkills: UserSkill[] }>(
    {
      defaultValues: {
        userSkills: [defaultUserSkill],
      },
    }
  );
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'userSkills',
  });
  const onSubmit = (data: { userSkills: UserSkill[] }) => {
    onSave(data.userSkills, userId);
  };

  const addNewSkillForm = () => {
    append(defaultUserSkill);
  };

  useEffect(() => {
    if (currentUserSkills.length) {
      reset({ userSkills: currentUserSkills });
      replace(currentUserSkills);
    }
  }, [currentUserSkills, replace, reset]);

  return (
    <Card id='skill-info' sx={{ overflow: 'visible' }}>
      <Box
        p={3}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        marginBottom={3}
      >
        <Typography variant='h5'>Skills</Typography>
        <IconButton
          aria-label='add new skill form'
          color="success"
          onClick={addNewSkillForm}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      {isLoading || !skills ? (
        <Loading />
      ) : (
        <Form onSave={() => handleSubmit(onSubmit)()} hideCancelButton>
          <Grid container spacing={0.5} rowSpacing={2}>
            {fields.map((us, index) => (
              <SkillForm
                key={index}
                userSkill={us}
                skills={skills}
                control={control}
                index={index}
                remove={remove}
              />
            ))}
          </Grid>
        </Form>
      )}
    </Card>
  );
}

export default Skills;
