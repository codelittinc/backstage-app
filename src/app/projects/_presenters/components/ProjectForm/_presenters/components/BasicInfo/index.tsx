import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import React from "react";

import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import Channel from "@/app/repositories/_domain/interfaces/Channel";
import useChannelsController from "@/app/repositories/_presenters/components/RepositoryForm/_presenters/components/BasicInfo/_presenters/controllers/useChannelsController";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";

type Props = {
  onSave: (project: Project) => void;
  project?: Project;
};
function BasicInfo({ project, onSave }: Props): JSX.Element {
  const { customers, isLoading: isCustomersLoading } = useCustomersController();

  let customer = project ? project.customer : customers && customers[0];

  const { channels, isLoading: isChannelsLoading } =
    useChannelsController(customer);

  if (isCustomersLoading || isChannelsLoading) {
    return <Loading />;
  }

  const defaultProject = {
    name: "",
    customer: customers[0],
    slackChannel: channels[0].id,
    billable: false,
    logoUrl: "",
    logoBackgroundColor: "",
  };

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Form
        model={project}
        onSave={onSave}
        defaultModelValues={defaultProject}
        renderFields={(control) => (
          <>
            <Grid item xs={12} md={6}>
              <TextInputController
                label="Name"
                placeholder="Backstage"
                name={"name"}
                control={control}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AutocompleteController
                label={"Customer"}
                name={"customer"}
                options={customers}
                control={control}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AutocompleteController
                label={"Slack channel"}
                name={"slackChannel"}
                options={channels}
                control={control}
                getOptionLabel={(option: string | Channel) => {
                  if (typeof option === "string") {
                    return channels.find(
                      (channel: Channel) => channel.id === option
                    )?.name;
                  } else {
                    return option.name;
                  }
                }}
                isOptionEqualToValue={(
                  option: Channel,
                  value: string | Channel
                ) => {
                  if (typeof value === "string") {
                    return option.id === value;
                  } else {
                    return option.id == value.id;
                  }
                }}
                processSelectedValue={(
                  selectedValue: { id: number } | string
                ) => {
                  if (typeof selectedValue === "string") {
                    return selectedValue;
                  }

                  return selectedValue.id;
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <SwitchController
                name={"billable"}
                label={"Billable"}
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInputController
                label="Logo public url"
                placeholder="https://link-outside-backstage.com/logo.png"
                name={"logoUrl"}
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInputController
                label="Logo background color"
                placeholder="gray"
                name={"logoBackgroundColor"}
                control={control}
              />
            </Grid>
          </>
        )}
      />
    </Card>
  );
}

export default BasicInfo;
