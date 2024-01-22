"use client";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";

import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import Loading from "@/components/Loading";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import PerformanceMetrics from "./_presenters/components/PerformanceMetrics";
import useEditUserController from "./_presenters/controllers/useEditUserController";
import UserForm from "../_presenters/components/UserForm";

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
    <Grid item xs={6} key="user-form">
      <UserForm user={user} onSave={onSave} />
    </Grid>,
    <PerformanceMetrics key="performance-metrics" />,
  ];

  return <TabsLayout tabs={tabs} tabsChildren={tabsChildren} />;
}

export default Page;
