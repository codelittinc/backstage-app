"use client";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Header from "./_presenters/components/Header";
import BasicInfo from "./_presenters/components/BasicInfo";
import SidenavForm from "@/components/SidenavForm";
import StatementsOfWork from "./_presenters/components/StatementsOfWork";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";
import ProtectedComponent from "@/components/ProtectedComponent";

interface Props {
  project: Project;
  onSave: (project: Project) => void;
}

function ProjectForm({ project, onSave }: Props): JSX.Element {
  const [currentProject, updateCurrentProject] = useState(project);

  const { hasPermission: hasFinancialPermission } = usePermissions({
    ability: abilities.change,
    target: targets.financial,
  });

  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
  ];

  if (hasFinancialPermission) {
    sidenavItems.push({
      icon: "receipt_long",
      label: "contracts",
      href: "contracts",
    });
  }

  return (
    <SidenavForm sidebarItems={sidenavItems}>
      <Grid item xs={12}>
        <Header project={project} />
      </Grid>
      <Grid item xs={12}>
        <BasicInfo
          project={currentProject}
          onChange={updateCurrentProject}
          onSave={() => {
            onSave(currentProject);
          }}
        />
      </Grid>

      <ProtectedComponent ability={abilities.change} target={targets.financial}>
        <Grid item xs={12}>
          <StatementsOfWork project={currentProject} />
        </Grid>
      </ProtectedComponent>
    </SidenavForm>
  );
}

export default ProjectForm;
