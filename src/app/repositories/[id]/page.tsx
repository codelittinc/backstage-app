"use client";
import Grid from "@mui/material/Grid";
import MDBox from "@/components/Box";
import BaseLayout from "./BaseLayout";
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";
import BasicInfo from "./components/BasicInfo";
import Applications from "./components/Applications";
import Accounts from "./components/Accounts";
import { updateRepository, useGetRepository } from "@/api/repositories";
import { useParams } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Settings(): JSX.Element {
  const { id } = useParams();
  const { data: repository } = useGetRepository(id as string);
  const [currentRepository, updateCurrentRepository] = useState(repository);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateRepository,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["repositories", currentRepository?.id],
      });
    },
  });

  useEffect(() => {
    updateCurrentRepository(repository);
  }, [repository]);

  // @TODO: redirect to not found if not found
  if (!currentRepository) {
    return <></>;
  }

  const onChangeRepository = (key: string, value: any) => {
    updateCurrentRepository({
      ...currentRepository,
      [key]: value,
    });
  };

  const onSave = () => {
    mutation.mutate(currentRepository);
  };

  return (
    <BaseLayout>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header
                    repository={currentRepository}
                    onChangeActive={(value: boolean) =>
                      onChangeRepository("active", value)
                    }
                    onSave={onSave}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BasicInfo
                    repository={currentRepository}
                    onChange={onChangeRepository}
                    onSave={onSave}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Applications
                    repository={currentRepository}
                    onChange={onChangeRepository}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Accounts />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
      ></MDBox>
    </BaseLayout>
  );
}

export default Settings;
