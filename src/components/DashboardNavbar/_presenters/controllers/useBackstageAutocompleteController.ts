import { User } from "@/app/_domain/interfaces/User";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";
import routes from "@/routes";

const getUserRoutes = (users: User[]) => {
  return users.map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    route: routes.userPath(user.slug),
  }));
};

const getProjectRoutes = (projects: Project[]) => {
  return projects.map((project) => ({
    name: project.name,
    route: routes.projectPath(project.slug),
  }));
};

const useBackstageAutoCompleteController = () => {
  const { users = [], isLoading: isLoadingUsers } = useUsersController();
  const { projects = [], isLoading: isLoadingProjects } =
    useProjectsController();

  let routes = getUserRoutes(users as User[]).concat(
    getProjectRoutes(projects as Project[])
  );

  routes = routes.sort((a, b) => a.name.localeCompare(b.name));

  return {
    routes: routes,
    isLoading: isLoadingUsers || isLoadingProjects,
  };
};

export default useBackstageAutoCompleteController;
