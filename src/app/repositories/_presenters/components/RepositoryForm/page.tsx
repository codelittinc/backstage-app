"use client";
import Grid from "@mui/material/Grid";
import Header from "./_presenters/components/Header";
import BasicInfo from "./_presenters/components/BasicInfo";
import Applications from "./_presenters/components/Applications";
import { useEffect, useState } from "react";
import useRepositoryFormController from "./_presenters/controllers/useRepositoryFormController";
import { Repository } from "../../../_domain/interfaces/Repository";
import FormLayout from "@/components/LayoutContainers/FormLayout";

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

  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
    { icon: "badge", label: "applications", href: "applications" },
  ];
  return (
    <FormLayout sidebarItems={sidenavItems}>
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
