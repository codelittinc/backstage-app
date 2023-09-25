import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "../../FormField";
import { Repository } from "@/api/repositories";
import { Switch } from "@mui/material";
import Button from "@/components/Button";

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
                onChange("owner", value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormField
              label="Name"
              placeholder="Backstage"
              value={name}
              onChange={({ target: { value } }) => {
                onChange("name", value);
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
                      onChange={({ target: { value } }) => {
                        onChange("sourceControlType", value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Base branch"
                  placeholder="master"
                  value={baseBranch}
                  onChange={({ target: { value } }) => {
                    onChange("baseBranch", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box display="flex" alignItems="center">
              <Typography variant="caption" fontWeight="regular">
                {repository.supportsDeploy
                  ? "Deploys with Roadrunner"
                  : "Does not deploy with Roadrunner"}
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={repository.supportsDeploy}
                  onChange={() =>
                    onChange("supportsDeploy", !repository.supportsDeploy)
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box display="flex" alignItems="center" lineHeight={1}>
              <Typography variant="caption" fontWeight="regular">
                {repository.active ? "Active" : "Inactive"}
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={repository.active}
                  onChange={() => onChange("active", !repository.active)}
                />
              </Box>
            </Box>
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
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
