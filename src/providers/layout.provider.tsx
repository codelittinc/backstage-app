"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { ThemeProvider } from "@mui/material/styles";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import brandDark from "@/assets/images/logo-ct-dark.png";
import brandWhite from "@/assets/images/logo-ct.png";
import theme from "@/assets/theme";
import themeDark from "@/assets/theme-dark";
import AnchorScrollable from "@/components/AnchorScrollable";
import Box from "@/components/Box";
import Configurator from "@/components/Configurator";
import Sidenav from "@/components/Sidenav";
import Snackbar from "@/components/Snackbar";
import {
  setMiniSidenav,
  setOpenConfigurator,
  useMaterialUIController,
} from "@/theme";

export default function App({ children }: { children: React.ReactNode }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const pathname = usePathname();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const params = useSearchParams();
  const authKey = params.get("authKey");

  const configsButton = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </Box>
  );

  const displayConfigurator =
    process.env.NEXT_PUBLIC_DISPLAY_LAYOUT_CONFIGURATOR == "true";

  const displaySidenav =
    layout === "dashboard" &&
    !pathname.startsWith("/users/sign-in") &&
    !authKey;

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {displaySidenav && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Backstage"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />

          {displayConfigurator && <Configurator />}
          {displayConfigurator && configsButton}
        </>
      )}
      <Snackbar />
      <AnchorScrollable />
      {children}
    </ThemeProvider>
  );
}
