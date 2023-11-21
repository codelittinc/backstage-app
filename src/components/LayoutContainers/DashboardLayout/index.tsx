import { ReactNode, useEffect } from "react";

import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";
import Box from "@/components/Box";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { setLayout, useMaterialUIController } from "@/theme";

interface Props {
  children: ReactNode;
  stickyNavbar?: boolean;
}

function DashboardLayout({ children, stickyNavbar }: Props): JSX.Element {
  const { isLoading } = useCurrentUserController();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box
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
        <DashboardNavbar absolute={!stickyNavbar} />
        <Box mt={5} />
        {children}
        <Footer />
      </Box>
    </>
  );
}

export default DashboardLayout;
