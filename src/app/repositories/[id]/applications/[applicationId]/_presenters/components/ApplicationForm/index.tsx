import { Switch } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Application } from "@/app/repositories/_domain/interfaces/Application";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

import ServerForm from "./_components/ServerForm";
import LinksTable from "./_components/ServerForm/_components/LinksTable";
import Form from "@/components/Form";
import { useForm, useWatch } from "react-hook-form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";

type Props = {
  application: Application;
  onSave: (application: Application) => void;
};

function ApplicationForm({ application, onSave }: Props): JSX.Element {
  const { handleSubmit, control, setValue } = useForm<
    Application & { hasPublicUrl: boolean; externalIdentifiers: string[] }
  >({
    defaultValues: {
      ...application,
      externalIdentifiers:
        application?.externalIdentifiers?.map((eI) => eI.text) || [],
      hasPublicUrl: !!application?.server,
    },
  });

  const hasPublicUrl = useWatch({ control, name: "hasPublicUrl" });
  useEffect(() => {
    if (!hasPublicUrl) {
      setValue("server", undefined);
    }
  }, [hasPublicUrl]);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Application</Typography>
      </Box>
      <Form onSave={() => handleSubmit(onSave)()}>
        <Grid item xs={12} md={3}>
          <AutocompleteController
            label="Environment"
            name="environment"
            options={["dev", "qa", "prod"]}
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <AutocompleteController
            label="External identifiers"
            name="externalIdentifiers"
            control={control}
            options={[]}
            freeSolo
            multiple
          />
        </Grid>
        <Grid item xs={3}>
          <SwitchController
            name="hasPublicUrl"
            label="Has public URL"
            control={control}
            labelPosition="right"
          />
        </Grid>

        {hasPublicUrl && (
          <>
            <Grid item xs={3}>
              <SwitchController
                name="server.supportsHealthCheck"
                label="Has a /health for health checks"
                control={control}
                labelPosition="right"
              />
            </Grid>
            <Grid item xs={6}>
              <SwitchController
                name="server.active"
                label="Active"
                control={control}
                labelPosition="right"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextInputController
                label="URL"
                placeholder="https://example.com"
                name="server.link"
                control={control}
                required
              />
            </Grid>
          </>
        )}
      </Form>

      <LinksTable application={application} />
    </Card>
  );
}

export default ApplicationForm;
