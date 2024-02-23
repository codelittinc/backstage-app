"use client";
import { useParams } from "next/navigation";

import Finances from "@/components/Analytics/Finances";
import TimeEntries from "@/components/Analytics/TimeEntries";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import Loading from "@/components/Loading";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import PerformanceMetrics from "./_presenters/components/PerformanceMetrics";
import useUpdateProjectController from "./_presenters/controllers/useUpdateProjectController";
import ProjectForm from "../_presenters/components/ProjectForm";

function Page() {
  const { id } = useParams();

  const { project, isLoading, onSave } = useUpdateProjectController(
    id as string
  );

  const { hasPermission: displayAnalytics } = usePermissionsController({
    ability: abilities.view,
    target: targets.analytics,
  });

  const { hasPermission: displayFinances } = usePermissionsController({
    ability: abilities.view,
    target: targets.finances,
  });

  if (isLoading) {
    return <Loading />;
  }

  const tabs = displayAnalytics
    ? ["Profile", "Performance metrics", "Time entries"]
    : ["Profile"];

  if (displayFinances) {
    tabs.push("Finances");
  }

  const tabsChildren = displayAnalytics
    ? [
        <ProjectForm
          project={project!}
          onSave={onSave}
          key={"profile-component"}
        />,
        <PerformanceMetrics project={project!} key={"metrics-component"} />,
        <TimeEntries project={project!} key={"time-entries-component"} />,
      ]
    : [
        <ProjectForm
          project={project!}
          onSave={onSave}
          key={"profile-component"}
        />,
      ];

  if (displayFinances) {
    tabsChildren.push(
      <Finances project={project!} key={"finances-component"} />
    );
  }
  return <TabsLayout tabs={tabs} tabsChildren={tabsChildren} />;
}

export default Page;
