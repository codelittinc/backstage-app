import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { Grid } from "@mui/material";
import { ServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import FormField from "@/components/FormField";
import Avatar from "@/components/Avatar";

interface Props {
  onChange: (serviceIdentifier: ServiceIdentifier) => void;
  serviceIdentifier: ServiceIdentifier;
}

function GithubUserAccountForm({
  serviceIdentifier,
  onChange,
}: Props): JSX.Element {
  const { customers } = useCustomersController();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            }
            alt="Slack logo"
            variant="rounded"
          />
          <Box ml={2}>
            <Typography variant="h5" fontWeight="medium">
              Github
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box ml={2} pl={6} pt={2} lineHeight={1}>
        <Typography variant="button" color="text">
          Set your Github username
        </Typography>
        <Box ml={2} pl={6} pt={2} lineHeight={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField
                label="Github username"
                placeholder="github username"
                value={serviceIdentifier.identifier}
                onChange={({ target: { value } }) => {
                  onChange({
                    ...serviceIdentifier,
                    identifier: value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default GithubUserAccountForm;
