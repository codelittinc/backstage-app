"use client";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import ProtectedComponent from "@/components/ProtectedComponent";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import SidenavForm from "@/components/SidenavForm";
import { abilities, targets } from "@/permissions";

import BasicInfo from "./_presenters/components/BasicInfo";
import Header from "./_presenters/components/Header";
import StatementsOfWork from "./_presenters/components/StatementsOfWork";

interface Props {
  onSave: (project: Project) => void;
  project: Project;
}

function ProjectForm({ project, onSave }: Props): JSX.Element {
  const [currentProject, updateCurrentProject] = useState(project);

  const { hasPermission: hasFinancialPermission } = usePermissions({
    ability: abilities.change,
    target: targets.finances,
  });

  const displayStatementsOfWork = hasFinancialPermission && project.id;

  return (
    <SidenavForm>
      <Grid item xs={12}>
        <Header project={currentProject} />
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

      {displayStatementsOfWork && (
        <Grid item xs={12}>
          <StatementsOfWork project={currentProject} />
        </Grid>
      )}
    </SidenavForm>
  );
}

export default ProjectForm;
