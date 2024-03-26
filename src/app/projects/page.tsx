"use client";

import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/navigation";

import Box from "@/components/Box";
import Button from "@/components/Button";
import DateRangePicker from "@/components/DateRangePicker";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Loading from "@/components/Loading";
import ProtectedComponent from "@/components/ProtectedComponent";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import Typography from "@/components/Typography";
import { abilities, targets } from "@/permissions";
import routes from "@/routes";

import ComplexProjectCard from "./_presenters/components/ComplexProjectCard";
import useProjectsController from "./_presenters/controllers/useProjectsController";
import useDateRangeController from "../_presenters/controllers/queries/useDateRangeController";
import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "../_presenters/utils/date";

const renderProjects = (
  projects: Project[],
  onClick: Function,
  hasProjectsPermission: boolean,
  hasUsersPermission: boolean
) => {
  return projects.map((project: Project) => {
    const { name, slug, logoUrl } = project;
    const { customer: { name: customerName } = {} } = project;
    const projectPath = routes.projectPath(slug as string);

    const title = name == customerName ? name : `${customerName} - ${name}`;
    const onClickTitle = hasProjectsPermission
      ? () => onClick(projectPath)
      : undefined;

    return (
      <Grid item xs={12} md={6} lg={4} key={project.name}>
        <Box mb={1.5} mt={1.5}>
          <ComplexProjectCard
            image={logoUrl ?? ""}
            title={title}
            color={project.logoBackgroundColor || "light"}
            description=""
            dateTime={project.endDate}
            members={project.participants.map((participant) => {
              return { id: participant.slug, src: participant.imageUrl };
            })}
            onClickTitle={onClickTitle}
            hasUsersPermission={hasUsersPermission}
          />
        </Box>
      </Grid>
    );
  });
};

function AllProjects(): JSX.Element {
  const router = useRouter();
  const defaultStartDate = getFirstDayOfCurrentMonth();
  const defaultEndDate = getLastDayOfCurrentMonth();
  const { hasPermission: hasProjectsPermission } = usePermissions({
    ability: abilities.change,
    target: targets.projects,
  });

  const { hasPermission: hasUsersPermission } = usePermissions({
    ability: abilities.change,
    target: targets.projects,
  });

  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController(
    defaultStartDate,
    defaultEndDate
  );

  const { projects = [], isLoading } = useProjectsController(
    startDate,
    endDate
  );

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
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid
                container
                p={2}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={10} display={"flex"}>
                  <Typography variant="h6">Active between</Typography>
                  <Grid item xs={2} ml={1}>
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      onDateRangeChange={(startDate, endDate) => {
                        updateDateRangeQuery(startDate, endDate);
                      }}
                      label=""
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2} justifyContent="end" textAlign="right">
                  <ProtectedComponent
                    ability={abilities.change}
                    target={targets.projects}
                  >
                    <Button
                      variant="gradient"
                      color="info"
                      onClick={() => banana()}
                    >
                      <Icon>add</Icon>&nbsp; Add New
                    </Button>
                  </ProtectedComponent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Grid container spacing={3}>
            {renderProjects(
              projects,
              (route: string) => router.push(route),
              hasProjectsPermission,
              hasUsersPermission
            )}
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default AllProjects;
