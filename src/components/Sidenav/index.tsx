import { usePathname } from "next/navigation";

import MDAvatar from "@/components/Avatar";
import { useSession } from "next-auth/react";
import { useEffect, useState, ReactNode } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import SidenavCollapse from "./SidenavCollapse";
import SidenavList from "./SidenavList";
import SidenavItem from "./SidenavItem";
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

import codelittLogo from "@/assets/images/logos/codelitt.png";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "@/theme";

interface Props {
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark";
  brand?: string;
  brandName: string;
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]:
            | ReactNode
            | string
            | {
                [key: string]: ReactNode | string;
              }[];
        }[];
  }[];
  [key: string]: any;
}

function Sidenav({ color, brand, brandName, ...rest }: Props): JSX.Element {
  const [openCollapse, setOpenCollapse] = useState<boolean | string>(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState<
    boolean | string
  >(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const pathname = usePathname();
  const collapseName = pathname.split("/").slice(1)[0];
  const items = pathname.split("/").slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  let textColor:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "white"
    | "inherit"
    | "text"
    | "light" = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, []);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, pathname]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) => {
    const template = collapse.map(({ name, route, key, href }: any) => (
      <Link
        key={key}
        href={href}
        rel="noreferrer"
        sx={{ textDecoration: "none" }}
      >
        <SidenavItem name={name} nested />
      </Link>
    ));

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(({ name, collapse, route, href, key }: any) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            active={key === itemParentName ? "isParent" : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }: any) =>
              openNestedCollapse === key &&
              currentTarget.classList.contains("MuiListItem-root")
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = (
          <Link
            href={href}
            key={key}
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem color={color} name={name} active={key === itemName} />
          </Link>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }
  const { user } = session;
  const routes = [
    {
      type: "collapse",
      name: user.name,
      key: user.name,
      icon: <MDAvatar src={user.image} alt={user.name} size="sm" />,
      collapse: [
        {
          name: "My Profile",
          key: "my-profile",
          route: "/pages/profile/profile-overview",
          href: "/users/1",
        },
        {
          name: "Settings",
          key: "profile-settings",
          route: "/pages/account/settings",
          component: <></>,
        },
        {
          name: "Logout",
          key: "logout",
          route: "/authentication/sign-in/basic",
          component: <></>,
        },
      ],
    },
    { type: "divider", key: "divider-0" },
    {
      type: "collapse",
      name: "Dashboards",
      key: "dashboards",
      icon: <Icon fontSize="medium">dashboard</Icon>,
      collapse: [
        {
          name: "Analytics",
          key: "analytics",
          route: "/dashboards/analytics",
          component: <></>,
        },
        {
          name: "Sales",
          key: "sales",
          route: "/dashboards/sales",
          component: <></>,
        },
      ],
    },
  ];
  const renderRoutes = routes.map(
    ({
      type,
      name,
      icon,
      title,
      collapse,
      noCollapse,
      key,
      href,
      route,
    }: any) => {
      let returnValue;

      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link href={href} key={key} sx={{ textDecoration: "none" }}>
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() =>
                openCollapse === key
                  ? setOpenCollapse(false)
                  : setOpenCollapse(key)
              }
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <Typography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </Typography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </Typography>
        </Box>
        <Box to="/" display="flex" alignItems="center">
          {brand && (
            <Box
              component="img"
              src={codelittLogo.src}
              alt="Codelitt"
              width="1.5rem"
            />
          )}
          <Box
            width={!brandName && "100%"}
            sx={(theme: any) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <Typography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

export default Sidenav;