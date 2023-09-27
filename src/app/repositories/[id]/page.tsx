"use client";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";
import BasicInfo from "./components/BasicInfo";
import Applications from "./components/Applications";
import { updateRepository, useGetRepository } from "@/api/repositories";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/lib/store";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";

function Settings(): JSX.Element {
  const { id } = useParams();
  const { data: repository } = useGetRepository(id as string);
  const [currentRepository, updateCurrentRepository] = useState(repository);

  const { showAlert } = useAppStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateRepository,
    onSuccess: () => {
      showAlert({
        color: "success",
        title: "Success!",
        content: "your repository has been updated",
      });
      queryClient.invalidateQueries({
        queryKey: ["repositories", currentRepository?.id],
      });
    },
    onError: () => {
      showAlert({
        color: "error",
        title: "Error!",
        content: "There was an error updating your repository",
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
              <Grid item xs={12}>
                <Applications repository={currentRepository} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Settings;
