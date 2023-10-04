import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "../FormField";
import { Switch } from "@mui/material";
import Button from "@/components/Button";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import useChannelsController from "./_presenters/_controllers/useChannelsController";
import Loading from "@/components/Loading";
import Autocomplete from "@/components/Autocomplete";
import Channel from "@/app/repositories/_domain/interfaces/Channel";

function BasicInfo({
  repository,
  onChange,
  onSave,
}: {
  repository: Repository;
  onChange: Function;
  onSave: Function;
}): JSX.Element {
  const { name, owner, baseBranch, sourceControlType, slackRepositoryInfo } =
    repository;
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
                  label={"Source control"}
                  value={sourceControlType}
                  defaultValue="github"
                  onChange={(value: string) => {
                    onChange({
                      ...repository,
                      sourceControlType: value,
                    });
                  }}
                  options={["github", "azure"]}
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
                  value={slackRepositoryInfo?.devGroup || ""}
                  onChange={({ target: { value } }) => {
                    onChange({
                      ...repository,
                      slackRepositoryInfo: {
                        ...(slackRepositoryInfo || {}),
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
              label={"Development channel"}
              value={
                channels.find(
                  (channel: Channel) =>
                    channel.id == slackRepositoryInfo?.devChannel
                ) || channels[0]
              }
              getOptionLabel={(option) => option.name}
              options={channels}
              onChange={(newValue) => {
                onChange({
                  ...repository,
                  slackRepositoryInfo: {
                    ...(slackRepositoryInfo || {}),
                    devChannel: newValue.id,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              label="Deploy channel"
              value={
                channels.find(
                  (channel: Channel) =>
                    channel.id === slackRepositoryInfo?.deployChannel
                ) || channels[0]
              }
              getOptionLabel={(option) => option.name}
              options={channels}
              onChange={(newValue) => {
                onChange({
                  ...repository,
                  slackRepositoryInfo: {
                    ...(slackRepositoryInfo || {}),
                    deployChannel: newValue.id,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              label="Feed channel"
              value={
                channels.find(
                  (channel: Channel) =>
                    channel.id === slackRepositoryInfo?.feedChannel
                ) || channels[0]
              }
              getOptionLabel={(option) => option.name}
              options={channels}
              onChange={(newValue) => {
                onChange({
                  ...repository,
                  slackRepositoryInfo: {
                    ...(slackRepositoryInfo || {}),
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
