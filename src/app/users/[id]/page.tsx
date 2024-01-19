"use client";
import { useParams } from "next/navigation";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";
import UserForm from "./_presenters/components/UserForm";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";

function Page(): JSX.Element {
  const { id } = useParams();

  const { hasPermission: displayAnalytics } = usePermissionsController({
    ability: abilities.view,
    target: targets.analytics,
  });

  const tabs = ["Profile"];

  if (displayAnalytics) {
    tabs.push("Performance metrics");
  }

  const tabsChildren = [<UserForm />, <div>Performance metrics</div>];

  return <TabsLayout tabs={tabs} tabsChildren={tabsChildren} />;
}

export default Page;
