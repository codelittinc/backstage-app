"use client";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import PerformanceMetrics from "./_presenters/components/PerformanceMetrics";
import UserForm from "./_presenters/components/UserForm";
import { useParams } from "next/navigation";
import useEditUserController from "./_presenters/controllers/useEditUserController";
import Loading from "@/components/Loading";

function Page(): JSX.Element {
  const { id } = useParams();
  const { hasPermission: displayAnalytics } = usePermissionsController({
    ability: abilities.view,
    target: targets.analytics,
  });

  const { user, onSave, isLoading } = useEditUserController(id as string);

  const tabs = ["Profile"];

  if (isLoading || !user) {
    return <Loading />;
  }

  if (displayAnalytics) {
    tabs.push("Performance metrics");
  }

  const tabsChildren = [
    <UserForm key="user-form" user={user} onSave={onSave} />,
    <PerformanceMetrics key="performance-metrics" />,
  ];

  return <TabsLayout tabs={tabs} tabsChildren={tabsChildren} />;
}

export default Page;
