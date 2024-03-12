import { useMemo } from "react";

import Timesheets from "../Timesheets";

const AllTimesheets = () => {
  return useMemo(() => <Timesheets />, []);
};

export default AllTimesheets;
