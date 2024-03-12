const routes = {
  projectsPath: "/projects",
  repositoryPath: (id: number | string) => `/repositories/${id}`,
  customerPath: (id: number | string) => `/customers/${id}`,
  projectPath: (id: number | string) => `/projects/${id}`,
  userPath: (id: number | string) => `/users/${id}`,
  timesheetsPath: "/timesheets",
  newRepositoryPath: "/repositories/new",
  newCustomerPath: "/customers/new",
  newProjectPath: "/projects/new",
  signInPath: "/users/sign-in",
  userSettingsPath: "/users/me",
  statementOfWorkPath: (id: number, projectId: number | string) =>
    `/projects/${projectId}/statements-of-work/${id}`,
  newStatementOfWorkPath: (projectId: number | string) =>
    `/projects/${projectId}/statements-of-work/new`,
  applicationPath: (id: number, repositoryId: number | string) =>
    `/repositories/${repositoryId}/applications/${id}`,
  newApplicationPath: (repositoryId: number | string) =>
    `/repositories/${repositoryId}/applications/new`,
  requirementPath: (
    requirementId: number | string,
    statementOfWorkId: number | string,
    projectId: number | string
  ) =>
    `/projects/${projectId}/statements-of-work/${statementOfWorkId}/requirements/${requirementId}`,
  assignmentPath: (
    assignmentId: number | string,
    requirementId: number | string,
    statementOfWorkId: number | string,
    projectId: number | string
  ) =>
    `/projects/${projectId}/statements-of-work/${statementOfWorkId}/requirements/${requirementId}/assignments/${assignmentId}`,
};

export default routes;
