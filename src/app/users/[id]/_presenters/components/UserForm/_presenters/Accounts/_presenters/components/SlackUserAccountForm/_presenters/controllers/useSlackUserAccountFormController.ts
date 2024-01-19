import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";

import useSlackUsersController from "../../../../controllers/useSlackUsersController";

const useUserAccountsController = (customer: Customer | undefined) => {
  const { slackUsers, isLoading: isSlackUsersLoading } =
    useSlackUsersController(customer);

  const { customers, isLoading: isCustomersLoading } = useCustomersController();

  return {
    customers: customers,
    slackUsers: slackUsers,
    isSlackUsersLoading: isSlackUsersLoading || isCustomersLoading,
    isCustomersLoading: isCustomersLoading,
  };
};

export default useUserAccountsController;
