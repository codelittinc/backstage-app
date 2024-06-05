"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import tanstackKeys from "../_domain/enums/tanstackKeys";
import { getProject } from "../projects/_presenters/data/services/projects";
import TimeEntries from "@/components/Analytics/TimeEntries";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useAppStore } from "../_presenters/data/store/store";
import { DEFAULT_STATEMENT_OF_WORK } from "@/components/PageFilters/StatementOfWorkFilter";
import { Grid, Icon, Typography } from "@mui/material";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Link from "next/link";

const ProjectDashboard = () => {
  const params = useSearchParams();
  const authKey = params.get("authKey") as string;

  const { setProjectAuthKey, projectAuthKey } = useAppStore();

  const { data: project, isLoading } = useQuery({
    queryKey: [tanstackKeys.Projects, authKey],
    queryFn: () => getProject(authKey),
    enabled: !!projectAuthKey,
  });

  useEffect(() => {
    if (authKey) {
      setProjectAuthKey(authKey as string);
    }
  }, [authKey]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item xs={12} padding={5}>
        <Grid xs={12} justifyContent={"center"} display="flex" mb={3}>
          <Avatar
            src={project?.logoUrl}
            bgColor={project?.logoBackgroundColor}
          />
          <Typography variant={"h2"} ml={2}>
            {project.name}
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent={"center"} display="flex">
          <Grid item xs={10}>
            <TimeEntries
              project={project}
              defaultStatementOfWork={DEFAULT_STATEMENT_OF_WORK}
            />
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="text"
        >
          <Typography variant="caption" fontWeight="medium">
            &copy; {new Date().getFullYear()}, made with
          </Typography>
          <Typography variant="caption" fontWeight="medium">
            <Box color="text" mb={-0.5} mx={0.25}>
              <Icon color="error" fontSize="inherit">
                favorite
              </Icon>
            </Box>
          </Typography>
          <Typography variant="caption" fontWeight="medium">
            by
          </Typography>
          <Typography variant="caption" fontWeight="medium">
            <Link href={"https://codelitt.com"} target="_blank">
              &nbsp;Codelitt&nbsp;
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProjectDashboard;
