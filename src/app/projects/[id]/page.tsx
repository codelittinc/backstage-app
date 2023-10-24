"use client";
import { useParams } from "next/navigation";
import ProjectForm from "../_presenters/components/ProjectForm";
import useNewProjectController from "./_presenters/controllers/useProjectController";
import Loading from "@/components/Loading";
import TabsLayout from "@/components/LayoutContainers/TabsLayout";
import Analytics from "./_presenters/components/Analytics";
import usePermissionsController from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { targets, abilities } from "@/permissions";

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
  const tabs = displayAnalytics ? ["Profile", "Analytics"] : ["Profile"];

  const tabsChildren = displayAnalytics
    ? [
        <ProjectForm
          project={project!}
          onSave={onSave}
          key={"profile-component"}
        />,
        <Analytics project={project!} key={"analytics-component"} />,
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
