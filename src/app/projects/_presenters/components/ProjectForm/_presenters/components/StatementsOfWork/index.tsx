import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import StatementsOfWorkTable from "./_presenters/components/StatementsOfWorkTable";

function StatementsOfWork({
  project,
  onSave,
}: {
  project: Project;
  onChange: Function;
  onSave: Function;
}): JSX.Element {
  return (
    <Card id="statements-of-work" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Contracts</Typography>
      </Box>

      <Grid container>
        <StatementsOfWorkTable project={project} />
      </Grid>
      <Box component="form" pb={3} px={3}>
        <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
            pt={2}
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

export default StatementsOfWork;
