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

function TabsLayout({ tabs, tabsChildren }: Props): JSX.Element {
  const { setCustomParams, getCustomParams } = useQueryParamController([
    {
      key: "tab",
      defaultValue: 0,
    },
  ]);

  const updateActiveTab = (value: number) => {
    setCustomParams([{ key: "tab", value }]);
  };

  const tab = getCustomParams().tab as number;

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
