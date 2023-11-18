"use client";

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/navigation";

import Box from "@/components/Box";
import Button from "@/components/Button";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Typography from "@/components/Typography";
import routes from "@/routes";

import ComplexProjectCard from "./_presenters/components/ComplexProjectCard";
import useProjectsController from "./_presenters/controllers/useProjectsController";
import ProtectedComponent from "@/components/ProtectedComponent";
import { abilities, targets } from "@/permissions";

const renderProjects = (projects: Project[], onClick: Function) => {
  return projects.map((project: Project) => {
    const { name, slug, logoUrl } = project;
    const projectPath = routes.projectPath(slug);

    return (
      <Grid item xs={12} md={6} lg={4} key={project.name}>
        <Box mb={1.5} mt={1.5}>
          <ComplexProjectCard
            image={logoUrl ?? ""}
            title={name}
            description=""
            dateTime={project.endDate}
            members={project.participants.map(
              (participant) => participant.imageUrl
            )}
            onClickTitle={() => onClick(projectPath)}
          />
        </Box>
      </Grid>
    );
  });
};

function AllProjects(): JSX.Element {
  const { projects = [] } = useProjectsController();
  const router = useRouter();

  return (
    <DashboardLayout>
      <Box pb={3}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={7}>
            <Box mb={1}>
              <Typography variant="h5">Our Awesome Projects</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="text">
                Here you can find all of our projects!
              </Typography>
            </Box>
          </Grid>
          <ProtectedComponent
            ability={abilities.change}
            target={targets.projects}
          >
            <Grid item xs={12} md={5} sx={{ textAlign: "right" }}>
              <Button
                variant="gradient"
                color="info"
                onClick={() => router.push(routes.newProjectPath)}
              >
                <Icon>add</Icon>&nbsp; Add New
              </Button>
            </Grid>
          </ProtectedComponent>
        </Grid>
        <Box mt={5}>
          <Grid container spacing={3}>
            {renderProjects(projects, (route: string) => router.push(route))}
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default AllProjects;
