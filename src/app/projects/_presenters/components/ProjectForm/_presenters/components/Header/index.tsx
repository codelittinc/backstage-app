import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Link from "next/link";
import routes from "@/routes";

type Props = {
  project?: Project;
};

function Header({ project }: Props): JSX.Element {
  const name = project ? project.name : "New Project";
  const reportKey = project?.reportKey;

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              bgColor={project?.logoBackgroundColor}
              src={project?.logoUrl}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                {name}
              </Typography>
            </Box>

            {reportKey && (
              <Typography variant="body2" color="textSecondary">
                <Link
                  href={routes.projectReportPath(reportKey)}
                  target={"_blank"}
                >
                  Client report
                </Link>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
