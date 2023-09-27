"use client";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";
import BasicInfo from "./components/BasicInfo";
import Applications from "./components/Applications";
import {
  Repository,
  saveRepository,
  useGetRepository,
} from "@/api/repositories";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/lib/store";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";

const defaultRepository = {
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
  var repository: Repository = defaultRepository;
  const newRepository = id == "new";
  const router = useRouter();

  if (!newRepository) {
    const { data } = useGetRepository(id as string); // eslint-disable-line
    repository = data as Repository;
  }

  const [currentRepository, updateCurrentRepository] = useState(repository);

  const { showAlert } = useAppStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveRepository,
    onSuccess: (result) => {
      showAlert({
        color: "success",
        title: "Success!",
        content: `your repository has been ${
          newRepository ? "created" : "updated"
        }`,
      });
      queryClient.invalidateQueries({
        queryKey: ["repositories", currentRepository?.id],
      });

      router.push(`/repositories/${result.id}`);
    },
    onError: (err) => {
      showAlert({
        color: "error",
        title: "Error!",
        content: `There was an error updating your repository. Error: ${JSON.stringify(
          err.response.data
        )}`,
        autoHideDuration: 10000,
      });
    },
  });

  useEffect(() => {
    updateCurrentRepository(repository);
  }, [repository]);

  if (!currentRepository) {
    return <></>;
  }

  const onSave = () => {
    mutation.mutate(currentRepository);
  };

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
              {!newRepository && (
                <Grid item xs={12}>
                  <Applications repository={currentRepository} />
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
