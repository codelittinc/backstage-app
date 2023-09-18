"use client";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import { User } from "@/components/user.component";

function Analytics(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Grid container></Grid>
        <Box mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box mb={3}>
                <User />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box mb={3}></Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box mb={3}></Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Box mb={1.5}></Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box mb={1.5}></Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box mb={1.5}></Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box mb={1.5}></Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box mt={3}></Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box mt={3}></Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box mt={3}></Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
