"use client";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Header from "./_presenters/components/Header";
import BasicInfo from "./_presenters/components/BasicInfo";
import SidenavForm from "@/components/SidenavForm";
import StatementsOfWork from "./_presenters/components/StatementsOfWork";

interface Props {
  project: Project;
  onSave: (project: Project) => void;
}

function ProjectForm({ project, onSave }: Props): JSX.Element {
  const [currentProject, updateCurrentProject] = useState(project);

  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
  ];

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
      <Grid item xs={12}>
        <StatementsOfWork
          project={currentProject}
          onChange={updateCurrentProject}
          onSave={() => {
            onSave(currentProject);
          }}
        />
      </Grid>
    </SidenavForm>
  );
}

export default ProjectForm;
