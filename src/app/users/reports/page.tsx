"use client";
import { Grid, Typography, Chip, Stack } from "@mui/material";

import Loading from "@/components/Loading";

import Footer from "./presenters/components/Footer";
import SkillsSearch from "./presenters/components/SkillsSearch";
import UsersTable from "./presenters/components/UsersTable";
import useReportsController from "./presenters/controllers/useReportsController";
import VerticalBarChart from "@/components/Charts/VerticalBarChart";

const UsersDashboard = () => {
  const {
    users,
    onSearch,
    query,
    setQuery,
    isLoading,
    onExpand,
    selectedUser,
    userSkills,
    onKeyPress,
    onChangeSearch,
    skillsAnalytics,
    professionAreas,
    toggleProfessionArea,
  } = useReportsController();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item xs={12} padding={5}>
        <Grid xs={12} justifyContent={"center"} display="flex" mb={3}>
          <Typography variant={"h2"} ml={2}>
            Skills Search
          </Typography>
        </Grid>
        <Grid xs={12} display={"flex"} justifyContent={"center"}>
          <Grid md={5} xs={12}>
            <SkillsSearch
              onSearch={onSearch}
              query={query}
              setQuery={setQuery}
              onKeyPress={onKeyPress}
              onChangeSearch={onChangeSearch}
            />
          </Grid>
        </Grid>
        <Grid xs={12} display={"flex"} justifyContent={"center"} mt={2}>
          <Stack direction="row" spacing={1}>
            <Chip
              label="Engineering"
              color={
                professionAreas.includes("engineering") ? "primary" : "default"
              }
              onClick={() => toggleProfessionArea("engineering")}
              clickable
            />
            <Chip
              label="Design"
              color={professionAreas.includes("design") ? "primary" : "default"}
              onClick={() => toggleProfessionArea("design")}
              clickable
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={12} style={{ marginTop: "32px" }}>
          <VerticalBarChart
            title="Skills Analytics"
            verticalStacked={true}
            horizontalStacked={true}
            labelColor="white"
            chart={skillsAnalytics}
            valueType="number"
            formatter={(value: number) => {
              if (value == 0) return "";

              return value.toFixed(0);
            }}
          />
        </Grid>
        <Grid container justifyContent={"space-around"} display="flex" mt={5}>
          <Grid item xs={12} md={12} pb={12}>
            <UsersTable
              users={users}
              onExpand={onExpand}
              selectedUser={selectedUser}
              userSkills={userSkills}
            />
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default UsersDashboard;
