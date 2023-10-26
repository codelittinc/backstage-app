const routes = {
  repositoryPath: (id: number | string) => `/repositories/${id}`,
  customerPath: (id: number | string) => `/customers/${id}`,
  projectPath: (id: number | string) => `/projects/${id}`,
  userPath: (id: number | string) => `/users/${id}`,
  newRepositoryPath: "/repositories/new",
  newCustomerPath: "/customers/new",
  newProjectPath: "/projects/new",
  signInPath: "/users/sign-in",
  userSettingsPath: "/users/me",
  statementOfWorkPath: (id: number, projectId: number | string) =>
    `/projects/${projectId}/statements-of-work/${id}`,
  newStatementOfWorkPath: (projectId: number | string) =>
    `/projects/${projectId}/statements-of-work/new`,
};

export default routes;
