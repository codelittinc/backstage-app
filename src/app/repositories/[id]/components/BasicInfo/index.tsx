import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "../../FormField";
import Checkbox from "@mui/material/Checkbox";
import { Repository } from "@/api/repositories";

function BasicInfo({
  repository,
  onChange,
}: {
  repository: Repository;
  onChange: Function;
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
          <Grid item xs={12} sm={12}>
            <Checkbox
              value={repository.supportsDeploy}
              onChange={({ target: { checked } }) => {
                console.log(checked);
                onChange("supportsDeploy", checked);
              }}
            />
            <Typography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Deploys with Roadrunner&nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
