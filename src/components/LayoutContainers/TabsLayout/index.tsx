import { ReactNode, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { AppBar, Grid, Tab, Tabs } from "@mui/material";

interface Props {
  tabs: string[];
  tabsChildren: JSX.Element[];
}

const getTabs = (
  tabs: string[],
  onChange: (value: number) => {},
  active: number
) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={8} lg={4} pb={2}>
        <AppBar position="static">
          <Tabs
            value={active}
            onChange={(event: React.SyntheticEvent, value: number) => {
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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DashboardLayout>
      {getTabs(tabs, setActiveTab, activeTab)}
      {tabsChildren[activeTab]}
    </DashboardLayout>
  );
}

export default TabsLayout;
