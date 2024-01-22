import { Grid } from "@mui/material";

import Profession from "@/app/_domain/interfaces/Profession";
import { ServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import FormField from "@/components/FormField";
import Typography from "@/components/Typography";

interface Props {
  onChange: (serviceIdentifier: ServiceIdentifier) => void;
  profession: Profession;
  serviceIdentifier: ServiceIdentifier;
}

function GithubUserAccountForm({
  serviceIdentifier,
  onChange,
  profession,
}: Props): JSX.Element {
  if (profession.name != "Engineer") {
    return <></>;
  }

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
      <Box ml={2} pl={6} lineHeight={1}>
        <Box pb={2} lineHeight={1}>
          <Grid pt={2} container spacing={3}>
            <Grid item xs={12} sm={7}>
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
