import { useState, useEffect, ReactNode } from "react";
import Box from "@/components/Box";
import breakpoints from "@/assets/theme/base/breakpoints";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

interface Props {
  stickyNavbar?: boolean;
  children: ReactNode;
}

function BaseLayout({ stickyNavbar, children }: Props): JSX.Element {
  const [tabsOrientation, setTabsOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute={!stickyNavbar} isMini />
      <Box mt={stickyNavbar ? 3 : 10}>{children}</Box>
      <Footer />
    </DashboardLayout>
  );
}

export default BaseLayout;
