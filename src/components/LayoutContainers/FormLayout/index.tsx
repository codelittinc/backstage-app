"use client";
import Box from "@/components/Box";
import Grid from "@mui/material/Grid";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Sidenav from "./_presenters/components/Sidenav";

interface Props {
  children: JSX.Element[] | JSX.Element;
  sidebarItems: { icon: string; label: string; href: string }[];
}
function FormLayout({ children, sidebarItems }: Props): JSX.Element {
  return (
    <DashboardLayout>
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav items={sidebarItems} />
          </Grid>
          <Grid item xs={12} lg={9}>
            <Box>
              <Grid container spacing={3}>
                {children}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default FormLayout;
