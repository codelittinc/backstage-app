"use client";
import { useParams } from "next/navigation";

import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import Loading from "@/components/Loading";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import Metrics from "./_presenters/components/Metrics";
import useNewProjectController from "./_presenters/controllers/useProjectController";
import ProjectForm from "../_presenters/components/ProjectForm";

function Page() {
  const { id } = useParams();

  const { project, isLoading, onSave } = useNewProjectController(id);
  const { hasPermission } = usePermissionsController({
    ability: abilities.view,
    target: targets.analytics,
  });

  if (isLoading) {
    return <Loading />;
  }

  const displayAnalytics = hasPermission;
  const tabs = displayAnalytics ? ["Profile", "Metrics"] : ["Profile"];

  const tabsChildren = displayAnalytics
    ? [
        <ProjectForm
          project={project!}
          onSave={onSave}
          key={"profile-component"}
        />,
        <Metrics project={project!} key={"metrics-component"} />,
      ]
    : [
        <ProjectForm
          project={project!}
          onSave={onSave}
          key={"profile-component"}
        />,
      ];
  return <TabsLayout tabs={tabs} tabsChildren={tabsChildren} />;
}

export default Page;
