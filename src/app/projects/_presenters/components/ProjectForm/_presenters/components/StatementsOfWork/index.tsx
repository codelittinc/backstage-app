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
      <Grid container p={3} px={3} pb={2}>
        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5">Contracts</Typography>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
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
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <StatementsOfWorkTable project={project} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default StatementsOfWork;
