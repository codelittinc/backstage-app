import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";
import Loading from "@/components/Loading";

import Timesheets from "../Timesheets";
import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import { useEffect } from "react";

const MyTimesheets = () => {
  const { currentUser, isLoading } = useCurrentUserController();
  const { updateDateRangeQuery } = useDateRangeController();

  useEffect(() => {
    updateDateRangeQuery(new Date());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <Timesheets user={currentUser} />;
};

export default MyTimesheets;
