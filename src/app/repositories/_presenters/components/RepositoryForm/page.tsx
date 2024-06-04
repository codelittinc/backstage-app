"use client";
import Grid from "@mui/material/Grid";

import FormLayout from "@/components/LayoutContainers/FormLayout";

import Applications from "./_presenters/components/Applications";
import BasicInfo from "./_presenters/components/BasicInfo";
import Header from "./_presenters/components/Header";
import useRepositoryFormController from "./_presenters/controllers/useRepositoryFormController";
import { Repository } from "../../../_domain/interfaces/Repository";

type Props = {
  repository?: Repository;
  onDelete?: () => void;
};
function RepositoryForm({ repository, onDelete }: Props): JSX.Element {
  const { onSave } = useRepositoryFormController();

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Header repository={repository} />
      </Grid>
      <Grid item xs={12}>
        <BasicInfo
          repository={repository}
          onSave={onSave}
          onDelete={onDelete}
        />
      </Grid>
      <>
        {!!repository?.id && (
          <Grid item xs={12}>
            <Applications repository={repository as Repository} />
          </Grid>
        )}
      </>
    </FormLayout>
  );
}

export default RepositoryForm;
