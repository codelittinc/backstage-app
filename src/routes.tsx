const routes = {
  repositoryPath: (id: number | string) => `/repositories/${id}`,
  customerPath: (id: number | string) => `/customers/${id}`,
  newRepositoryPath: "/repositories/new",
  newCustomerPath: "/customers/new",
  signInPath: "/users/sign-in",
};

export default routes;
