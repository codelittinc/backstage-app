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

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

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
