"use client";
import Grid from "@mui/material/Grid";
import Header from "./_presenters/components/Header";
import BasicInfo from "./_presenters/components/BasicInfo";
import Applications from "./_presenters/components/Applications";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useRepositoryController from "./_presenters/controllers/useRepositoryController";
import Loading from "@/components/Loading";
import { Repository } from "../_domain/interfaces/Repository";
import FormLayout from "@/components/LayoutContainers/FormLayout";

const defaultRepository = {
  id: null,
  name: "",
  owner: "codelittinc",
  active: true,
  sourceControlType: "github",
  baseBranch: "master",
  supportsDeploy: false,
  filterPullRequestsByBaseBranch: false,
  applications: [],
  slackRepositoryInfo: {
    devChannel: "",
    deployChannel: "",
    feedChannel: "",
    devGroup: "",
  },
};

function Settings(): JSX.Element {
  const { id } = useParams();
  const {
    onSave,
    isLoading,
    repository = defaultRepository,
  } = useRepositoryController(id as string);

  const [currentRepository, updateCurrentRepository] = useState(repository);

  useEffect(() => {
    updateCurrentRepository(repository);
  }, [repository]);

  if (isLoading) {
    return <Loading />;
  }

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
      {repository?.id && (
        <Grid item xs={12}>
          <Applications repository={currentRepository as Repository} />
        </Grid>
      )}
    </FormLayout>
  );
}

export default Settings;
