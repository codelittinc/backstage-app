"use client";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import PerformanceMetrics from "./_presenters/components/PerformanceMetrics";
import UserForm from "./_presenters/components/UserForm";

function Page(): JSX.Element {
  const { hasPermission: displayAnalytics } = usePermissionsController({
    ability: abilities.view,
    target: targets.analytics,
  });

  const tabs = ["Profile"];

  if (displayAnalytics) {
    tabs.push("Performance metrics");
  }

  const tabsChildren = [
    <UserForm key="user-form" />,
    <PerformanceMetrics key="performance-metrics" />,
  ];

  return <TabsLayout tabs={tabs} tabsChildren={tabsChildren} />;
}

export default Page;
