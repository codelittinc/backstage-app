"use client";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Sidenav from "./_presenters/_components/Sidenav";
import Header from "./_presenters/_components/Header";
import BasicInfo from "./_presenters/_components/BasicInfo";
import Applications from "./_presenters/_components/Applications";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import useRepositoryController from "./_presenters/_controllers/useRepositoryController";
import Loading from "@/components/Loading";
import { Repository } from "../_domain/interfaces/Repository";

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
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Header repository={currentRepository} />
              </Grid>
              <Grid item xs={12}>
                <BasicInfo
                  repository={currentRepository}
                  onChange={updateCurrentRepository}
                  onSave={onSave}
                />
              </Grid>
              {repository?.id && (
                <Grid item xs={12}>
                  <Applications repository={currentRepository as Repository} />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Settings;
