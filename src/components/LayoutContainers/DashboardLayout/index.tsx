import { useEffect, ReactNode } from "react";
import Box from "@/components/Box";
import { useMaterialUIController, setLayout } from "@/theme";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";
import Loading from "@/components/Loading";

interface Props {
  stickyNavbar?: boolean;
  children: ReactNode;
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
        <DashboardNavbar absolute={!stickyNavbar} isMini />
        <Box mt={10} />
        {children}
        <Footer />
      </Box>
    </>
  );
}

export default DashboardLayout;
