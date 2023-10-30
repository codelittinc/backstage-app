import { AppBar, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";

import DashboardLayout from "../DashboardLayout";

interface Props {
  tabs: string[];
  tabsChildren: JSX.Element[];
}

const getTabs = (
  tabs: string[],
  onChange: (value: number) => void,
  active: number
) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={8} lg={4} pb={2}>
        <AppBar position="static">
          <Tabs
            value={active}
            onChange={(_: React.SyntheticEvent, value: number) => {
              onChange(value);
            }}
          >
            {tabs.map((tab) => (
              <Tab label={tab} key={tab} />
            ))}
          </Tabs>
        </AppBar>
      </Grid>
    </Grid>
  );
};

function TabsLayout({ tabs, tabsChildren }: Props): JSX.Element {
  const { paramValue, setParamValue } = useQueryParamController("tab", 0);

  const tab = Number(paramValue);

  const updateActiveTab = (value: number) => {
    setParamValue(value);
  };

  return (
    <DashboardLayout>
      {getTabs(tabs, updateActiveTab, tab)}
      {tabsChildren[tab]}
    </DashboardLayout>
  );
}

export default TabsLayout;
