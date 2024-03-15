import { AppBar, Grid, Tab, Tabs } from "@mui/material";

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
      <Grid item xs={12} pb={2}>
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

const TAB_KEY = "tab";
function TabsLayout({ tabs, tabsChildren }: Props): JSX.Element {
  const { setCustomParams, getCustomParamValue } = useQueryParamController();

  const updateActiveTab = (value: number) => {
    setCustomParams([{ key: TAB_KEY, value }]);
  };

  const tab = Number(getCustomParamValue(TAB_KEY, 0));

  return (
    <DashboardLayout>
      {getTabs(tabs, updateActiveTab, tab)}
      <Grid container justifyContent={"center"}>
        {tabsChildren[tab]}
      </Grid>
    </DashboardLayout>
  );
}

export default TabsLayout;
