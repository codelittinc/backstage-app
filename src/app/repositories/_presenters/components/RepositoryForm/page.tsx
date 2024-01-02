"use client";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import FormLayout from "@/components/LayoutContainers/FormLayout";

import Applications from "./_presenters/components/Applications";
import BasicInfo from "./_presenters/components/BasicInfo";
import Header from "./_presenters/components/Header";
import useRepositoryFormController from "./_presenters/controllers/useRepositoryFormController";
import { Repository } from "../../../_domain/interfaces/Repository";

function RepositoryForm({
  repository,
}: {
  repository: Repository;
}): JSX.Element {
  const { onSave } = useRepositoryFormController();

  const [currentRepository, updateCurrentRepository] = useState(repository);

  useEffect(() => {
    updateCurrentRepository(repository);
  }, [repository]);

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Header repository={currentRepository} />
      </Grid>
      <Grid item xs={12}>
        <BasicInfo
          repository={currentRepository}
          onChange={updateCurrentRepository}
          onSave={() => onSave(currentRepository as Repository)}
        />
      </Grid>
      <>
        {!!repository?.id && (
          <Grid item xs={12}>
            <Applications repository={currentRepository as Repository} />
          </Grid>
        )}
      </>
    </FormLayout>
  );
}

export default RepositoryForm;
