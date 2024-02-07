import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { DefaultValues, useForm, useWatch } from "react-hook-form";

import { mergeObjects } from "@/app/_presenters/utils/objects";
import Channel from "@/app/repositories/_domain/interfaces/Channel";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import { Option } from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";

import useRepositoryFormBasicInfoController from "./_presenters/controllers/useRepositoryFormBasicInfoController";


const getDefaultRepository = (projectId: number | undefined) => ({
  id: undefined,
  name: "",
  projectId: projectId,
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
});

type Props = {
  onSave: (repository: Repository) => void;
  repository?: Repository;
};

function BasicInfo({ repository, onSave }: Props): JSX.Element {
  const defaultValues = mergeObjects(
    getDefaultRepository(repository?.projectId),
    repository || {}
  ) as DefaultValues<Repository>;

  defaultValues.slackRepositoryInfo = mergeObjects(
    getDefaultRepository(repository?.projectId).slackRepositoryInfo,
    repository?.slackRepositoryInfo || {}
  );

  const { handleSubmit, control } = useForm<Repository>({
    defaultValues,
  });

  const projectId = useWatch({
    control,
    name: "projectId",
  });

  const { channels, projects, isLoading } =
    useRepositoryFormBasicInfoController(projectId);

  if (isLoading) return <Loading />;
  if (!channels) return <></>;

  console.log(repository);
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Form onSave={() => handleSubmit(onSave)()}>
        <Grid item xs={12} md={3}>
          <AutocompleteController
            label="Project"
            name="projectId"
            options={projects}
            control={control}
            getOptionLabel={(option: number | Project) => {
              if (typeof option === "number") {
                return projects.find(
                  (project: Project) => project.id === option
                )?.name;
              } else {
                return option.name;
              }
            }}
            isOptionEqualToValue={(
              option: Project,
              value: number | Project
            ) => {
              if (typeof value === "number") {
                return option.id === value;
              } else {
                return option.id == value.id;
              }
            }}
            processSelectedValue={(selectedValue: Option | number) => {
              if (typeof selectedValue === "number") {
                return selectedValue;
              }

              return selectedValue.id;
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextInputController
            label="Owner"
            placeholder="codelittinc"
            name="owner"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextInputController
            label="Name"
            placeholder="backstage-app"
            name="name"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AutocompleteController
            label="Source control"
            name="sourceControlType"
            options={["github", "azure"]}
            control={control}
            getOptionLabel={(option: string) => option}
            isOptionEqualToValue={(option: string, value: string) =>
              option === value
            }
            required
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TextInputController
            label="Base branch"
            placeholder="master"
            name="baseBranch"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <SwitchController
            name="supportsDeploy"
            label="Deploys with Roadrunner"
            labelPosition="right"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <SwitchController
            name="active"
            label="Active"
            control={control}
            labelPosition="right"
          />
        </Grid>
        <Grid item xs={12}>
          <SwitchController
            name="filterPullRequestsByBaseBranch"
            label="Filter pull requests by base branch"
            labelPosition="right"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputController
            label="Slack dev group"
            placeholder="@devs"
            name="slackRepositoryInfo.devGroup"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AutocompleteController
            label="Development channel"
            name="slackRepositoryInfo.devChannel"
            options={channels}
            control={control}
            getOptionLabel={(option: string | { id: string; name: string }) => {
              if (typeof option === "string") {
                return channels.find(
                  (channel: Channel) => channel.id === option
                )?.name;
              } else {
                return option.name;
              }
            }}
            isOptionEqualToValue={(
              option: { id: string; name: string },
              value: string | { id: string; name: string }
            ) => {
              if (typeof value === "string") {
                return option.id === value;
              } else {
                return option.id == value.id;
              }
            }}
            processSelectedValue={(selectedValue: Option | string) => {
              if (typeof selectedValue === "string") {
                return selectedValue;
              }

              return selectedValue.id;
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AutocompleteController
            label="Deploy channel"
            name="slackRepositoryInfo.deployChannel"
            options={channels}
            control={control}
            getOptionLabel={(option: string | { id: string; name: string }) => {
              if (typeof option === "string") {
                return channels.find(
                  (channel: Channel) => channel.id === option
                )?.name;
              } else {
                return option.name || "";
              }
            }}
            isOptionEqualToValue={(
              option: { id: string; name: string },
              value: string | { id: string; name: string }
            ) => {
              if (typeof value === "string") {
                return option.id === value;
              } else {
                return option.id == value.id;
              }
            }}
            processSelectedValue={(selectedValue: Option | string) => {
              if (typeof selectedValue === "string") {
                return selectedValue;
              }

              return selectedValue.id;
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AutocompleteController
            label="Feed channel"
            name="slackRepositoryInfo.feedChannel"
            options={channels}
            control={control}
            getOptionLabel={(option: string | { id: string; name: string }) => {
              if (typeof option === "string") {
                return channels.find(
                  (channel: Channel) => channel.id === option
                )?.name;
              } else {
                return option.name;
              }
            }}
            isOptionEqualToValue={(
              option: { id: string; name: string },
              value: string | { id: string; name: string }
            ) => {
              if (typeof value === "string") {
                return option.id === value;
              } else {
                return option.id == value.id;
              }
            }}
            processSelectedValue={(selectedValue: Option | string) => {
              if (typeof selectedValue === "string") {
                return selectedValue;
              }

              return selectedValue.id;
            }}
            required
          />
        </Grid>
      </Form>
    </Card>
  );
}

export default BasicInfo;
