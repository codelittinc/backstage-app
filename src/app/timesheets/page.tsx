"use client";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import AllTimesheets from "./_presenters/components/AllTimesheets";
import MyTimesheets from "./_presenters/components/MyTimesheets";

const Page = () => {
  const { hasPermission } = usePermissions({
    ability: abilities.change,
    target: targets.projects,
  });

  const tabs = ["My Timesheets"];
  const components = [<MyTimesheets key="my-timesheets" />];

  if (hasPermission) {
    tabs.push("All Timesheets");
    components.push(<AllTimesheets key="all-timesheets" />);
  }

  return <TabsLayout tabs={tabs} tabsChildren={components} />;
};

export default Page;
