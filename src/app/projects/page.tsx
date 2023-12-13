"use client";

import { Switch } from "@mui/material";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Box from "@/components/Box";
import Button from "@/components/Button";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Loading from "@/components/Loading";
import ProtectedComponent from "@/components/ProtectedComponent";
import Typography from "@/components/Typography";
import { abilities, targets } from "@/permissions";
import routes from "@/routes";

import ComplexProjectCard from "./_presenters/components/ComplexProjectCard";
import useProjectsController from "./_presenters/controllers/useProjectsController";

const renderProjects = (projects: Project[], onClick: Function) => {
  return projects.map((project: Project) => {
    const { name, slug, logoUrl } = project;
    const { customer: { name: customerName } = {} } = project;
    const projectPath = routes.projectPath(slug);

    const title = name == customerName ? name : `${customerName} - ${name}`;
    return (
      <Grid item xs={12} md={6} lg={4} key={project.name}>
        <Box mb={1.5} mt={1.5}>
          <ComplexProjectCard
            image={logoUrl ?? ""}
            title={title}
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
  const [activeOnly, setActiveOnly] = useState(true);
  const { projects = [], isLoading } = useProjectsController(activeOnly);
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

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
          <Grid
            item
            xs={12}
            md={5}
            sx={{ textAlign: "right" }}
            display={"flex"}
            justifyContent={"end"}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="caption" fontWeight="regular">
                Active projects only
              </Typography>
              <Switch
                checked={activeOnly}
                onChange={() => setActiveOnly(!activeOnly)}
              />
            </Box>

            <ProtectedComponent
              ability={abilities.change}
              target={targets.projects}
            >
              <Button
                variant="gradient"
                color="info"
                onClick={() => router.push(routes.newProjectPath)}
              >
                <Icon>add</Icon>&nbsp; Add New
              </Button>
            </ProtectedComponent>
          </Grid>
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
