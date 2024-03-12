import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";
import Loading from "@/components/Loading";

import Timesheets from "../Timesheets";

const MyTimesheets = () => {
  const { currentUser, isLoading } = useCurrentUserController();

  if (isLoading) {
    return <Loading />;
  }

  return <Timesheets user={currentUser} />;
};

export default MyTimesheets;
