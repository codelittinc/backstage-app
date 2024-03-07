"use client";
import { Card, Grid } from "@mui/material";
import { DefaultValues, useForm } from "react-hook-form";

import { mergeObjects } from "@/app/_presenters/utils/objects";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import DatePickerController from "@/components/Form/FieldControllers/DatePickerController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";
import { User } from "@/app/_domain/interfaces/User";
import useUsersController from "@/app/_presenters/controllers/useUsersController";

interface Props {
  onSave: (assignment: Assignment) => void;
  assignment?: Assignment;
  requirement: Requirement;
}

const getDefaultRequirement = (
  requirement: Requirement,
  users: User[]
): Assignment => ({
  id: undefined,
  coverage: requirement.coverage,
  userId: (users[0]?.id as number) ?? 0,
  startDate: requirement.startDate,
  endDate: requirement.endDate,
  requirementId: requirement.id as number,
});

const AssignmentForm: React.FC<Props> = ({
  assignment,
  requirement,
  onSave,
}) => {
  const { users, isLoading } = useUsersController();

  const defaultValues = mergeObjects(
    getDefaultRequirement(requirement, users || []),
    assignment || {}
  ) as DefaultValues<Assignment>;

  const { handleSubmit, control } = useForm<Assignment>({
    defaultValues,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Card sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Typography variant="h5">Assignment</Typography>
          </Box>
          <Form onSave={() => handleSubmit(onSave)()}>
            <>
              <Grid item xs={12} md={6}>
                <AutocompleteController
                  label="User"
                  name="userId"
                  options={users || []}
                  control={control}
                  required
                  getOptionLabel={(option: User | number) => {
                    if (typeof option === "number") {
                      return users.find((user) => user.id === option)?.fullName;
                    }

                    return option.fullName;
                  }}
                  withObjectValue={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInputController
                  label="Coverage"
                  placeholder="0"
                  name="coverage"
                  control={control}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePickerController
                  label="Start Date"
                  name="startDate"
                  control={control}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePickerController
                  label="End Date"
                  name="endDate"
                  control={control}
                  required
                />
              </Grid>
            </>
          </Form>
        </Card>
      </Grid>
    </FormLayout>
  );
};

export default AssignmentForm;
