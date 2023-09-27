import { useEffect, ReactNode } from "react";
import MDBox from "@/components/Box";
import { useMaterialUIController, setLayout } from "@/theme";
import DashboardNavbar from "@/components/DashboardNavbar";

function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch]);

  return (
    <>
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          position: "relative",
          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        <DashboardNavbar />
        {children}
      </MDBox>
    </>
  );
}

export default DashboardLayout;
