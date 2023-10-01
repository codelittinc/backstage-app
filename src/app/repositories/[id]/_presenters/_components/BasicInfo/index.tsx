import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "../FormField";
import { Switch } from "@mui/material";
import Button from "@/components/Button";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import useChannelsController from "./_presenters/_controllers/useChannelsController";
import Loading from "@/components/Loading";

function BasicInfo({
  repository,
  onChange,
  onSave,
}: {
  repository: Repository;
  onChange: Function;
  onSave: Function;
}): JSX.Element {
  const { name, owner, baseBranch, sourceControlType } = repository;
  const { channels, isLoading } = useChannelsController();

  if (isLoading) return <Loading />;
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <FormField
              label="Owner"
              placeholder="Codelitt"
              value={owner}
              onChange={({ target: { value } }) => {
                onChange({
                  ...repository,
                  owner: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormField
              label="Name"
              placeholder="Backstage"
              value={name}
              onChange={({ target: { value } }) => {
                onChange({
                  ...repository,
                  name: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  defaultValue="github"
                  value={sourceControlType}
                  options={["github", "azure"]}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="Source control"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  onChange={(_, value) => {
                    onChange({
                      ...repository,
                      sourceControlType: value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Base branch"
                  placeholder="master"
                  value={baseBranch}
                  onChange={({ target: { value } }) => {
                    onChange({
                      ...repository,
                      baseBranch: value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box display="flex" alignItems="center">
              <Typography variant="caption" fontWeight="regular">
                Deploys with Roadrunner
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={repository.supportsDeploy}
                  onChange={() =>
                    onChange({
                      ...repository,
                      supportsDeploy: !repository.supportsDeploy,
                    })
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box display="flex" alignItems="center" lineHeight={1}>
              <Typography variant="caption" fontWeight="regular">
                Active
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={repository.active}
                  onChange={() =>
                    onChange({
                      ...repository,
                      active: !repository.active,
                    })
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box display="flex" alignItems="center" lineHeight={1}>
              <Typography variant="caption" fontWeight="regular">
                Filters pull request by base branch
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={repository.filterPullRequestsByBaseBranch}
                  onChange={() =>
                    onChange({
                      ...repository,
                      filterPullRequestsByBaseBranch:
                        !repository.filterPullRequestsByBaseBranch,
                    })
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid item xs={12} sm={3}>
              <Box display="flex" alignItems="center">
                <FormField
                  label="Slack dev group"
                  placeholder="@devs"
                  value={repository.slackRepositoryInfo?.devGroup || ""}
                  onChange={({ target: { value } }) => {
                    onChange({
                      ...repository,
                      slackRepositoryInfo: {
                        ...(repository.slackRepositoryInfo || {}),
                        devGroup: value,
                      },
                    });
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box display="flex" alignItems="center"></Box>
            <Autocomplete
              value={
                channels.find(
                  (channel) =>
                    channel.id === repository?.slackRepositoryInfo.devChannel
                ) || channels[0]
              }
              getOptionLabel={(option) => option.name}
              options={channels}
              renderInput={(params) => {
                return (
                  <FormField
                    {...params}
                    label="Development channel"
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }}
              onChange={(_, newValue) => {
                onChange({
                  ...repository,
                  slackRepositoryInfo: {
                    ...(repository.slackRepositoryInfo || {}),
                    devChannel: newValue.id,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              value={
                channels.find(
                  (channel) =>
                    channel.id === repository?.slackRepositoryInfo.deployChannel
                ) || channels[0]
              }
              getOptionLabel={(option) => option.name}
              options={channels}
              renderInput={(params) => {
                return (
                  <FormField
                    {...params}
                    label="Deploy channel"
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }}
              onChange={(_, newValue) => {
                onChange({
                  ...repository,
                  slackRepositoryInfo: {
                    ...(repository.slackRepositoryInfo || {}),
                    deployChannel: newValue.id,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              value={
                channels.find(
                  (channel) =>
                    channel.id === repository?.slackRepositoryInfo.feedChannel
                ) || channels[0]
              }
              getOptionLabel={(option) => option.name}
              options={channels}
              renderInput={(params) => {
                return (
                  <FormField
                    {...params}
                    label="Feed channel"
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }}
              onChange={(_, newValue) => {
                onChange({
                  ...repository,
                  slackRepositoryInfo: {
                    ...(repository.slackRepositoryInfo || {}),
                    feedChannel: newValue.id,
                  },
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
            lineHeight={1}
          >
            <Button
              variant="gradient"
              color="dark"
              size="small"
              onClick={() => onSave()}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
