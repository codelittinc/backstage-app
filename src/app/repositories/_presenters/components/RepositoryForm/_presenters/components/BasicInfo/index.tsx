import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { DefaultValues, useForm, useWatch } from "react-hook-form";

import { mergeObjects } from "@/app/_presenters/utils/objects";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Box from "@/components/Box";
import Form from "@/components/Form";
import AutocompleteController from "@/components/Form/FieldControllers/AutocompleteController";
import SwitchController from "@/components/Form/FieldControllers/SwitchController";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
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
  onDelete?: () => void;
};

function BasicInfo({ repository, onSave, onDelete }: Props): JSX.Element {
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

  const supportsDeploy = useWatch({
    control,
    name: "supportsDeploy",
  });

  const { channels, projects } =
    useRepositoryFormBasicInfoController(projectId);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Form onSave={() => handleSubmit(onSave)()} onDelete={onDelete}>
        <Grid item xs={12} md={3}>
          <AutocompleteController
            label="Project"
            name="projectId"
            options={projects}
            control={control}
            withObjectValue={false}
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
            withObjectValue={false}
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
            withObjectValue={false}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AutocompleteController
            label="Feed channel"
            name="slackRepositoryInfo.feedChannel"
            options={channels}
            control={control}
            withObjectValue={false}
            required
          />
        </Grid>
        {supportsDeploy && (
          <Grid item xs={12} md={6}>
            <AutocompleteController
              label="Deploy channel"
              name="slackRepositoryInfo.deployChannel"
              options={channels}
              control={control}
              withObjectValue={false}
              required
            />
          </Grid>
        )}
      </Form>
    </Card>
  );
}

export default BasicInfo;
