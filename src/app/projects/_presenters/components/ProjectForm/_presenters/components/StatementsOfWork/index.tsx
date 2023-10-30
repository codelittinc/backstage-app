import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import routes from "@/routes";

import StatementsOfWorkTable from "./_presenters/components/StatementsOfWorkTable";


function StatementsOfWork({ project }: { project: Project }): JSX.Element {
  const router = useRouter();

  return (
    <Card id="statements-of-work" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Contracts</Typography>
      </Box>

      <Box px={3} pb={2}>
        <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
            pt={2}
          >
            <Button
              variant="gradient"
              color="info"
              size="small"
              onClick={() =>
                router.push(routes.newStatementOfWorkPath(project.slug!))
              }
            >
              + New contract
            </Button>
          </Box>
        </Grid>
      </Box>

      <Grid container>
        <StatementsOfWorkTable project={project} />
      </Grid>
    </Card>
  );
}

export default StatementsOfWork;
