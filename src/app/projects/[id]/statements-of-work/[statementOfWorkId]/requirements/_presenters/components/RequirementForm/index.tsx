"use client";
import { Card, Grid } from "@mui/material";
import { DefaultValues, useForm } from "react-hook-form";

import Profession from "@/app/_domain/interfaces/Profession";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import DatePickerController from "@/components/Form/FieldControllers/DatePickerController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";
import routes from "@/routes";
import projectTabs from "@/app/projects/_domain/_enums/projectTabs";
import useRequirementFormController from "./presenters/controllers/useRequirementFormController";

interface Props {
  onSave: (requirement: Requirement) => void;
  onDelete?: (requirement: Requirement) => void;
  requirement?: Requirement;
  statementOfWork: StatementOfWork;
}

const RequirementForm = ({
  requirement,
  statementOfWork,
  onSave,
  onDelete,
}: Props) => {
  const { handleSubmit, control, isLoading, professions } =
    useRequirementFormController({
      statementOfWork,
      requirement,
    });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Card id="statement-of-work-info" sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Typography variant="h5">Requirement</Typography>
          </Box>
          <Form
            onSave={() => handleSubmit(onSave)()}
            onDelete={
              onDelete && requirement ? () => onDelete(requirement) : undefined
            }
            cancelPath={routes.projectPath(
              statementOfWork.projectId,
              projectTabs.resources
            )}
          >
            <>
              <Grid item xs={12} md={6}>
                <AutocompleteController
                  label="Required role"
                  name="professionId"
                  options={professions || []}
                  control={control}
                  required
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

export default RequirementForm;
