import { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { AppBar, Grid, Tab, Tabs } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const router = useRouter();

  const tab = params.get("tab") ? Number(params.get("tab")) : 0;

  const [activeTab, setActiveTab] = useState(tab);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  const updateActiveTab = (value: number) => {
    setActiveTab(value);
    updateQueryParam("tab", value.toString());
  };

  return (
    <DashboardLayout>
      {getTabs(tabs, updateActiveTab, activeTab)}
      {tabsChildren[activeTab]}
    </DashboardLayout>
  );
}

export default TabsLayout;
