import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

import currentUserController from "@/app/_presenters/controllers/useCurrentUserController";
import codelittLogo from "@/assets/images/logos/codelitt.png";
import MDAvatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { abilities, targets } from "@/permissions";
import routes from "@/routes";
import {
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  useMaterialUIController,
} from "@/theme";

import SidenavCollapse from "./SidenavCollapse";
import SidenavItem from "./SidenavItem";
import SidenavList from "./SidenavList";
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";
import Loading from "../Loading";
import ProtectedComponent from "../ProtectedComponent";

interface Props {
  [key: string]: any;
  brand?: string;
  brandName: string;
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark";
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
  }, [collapseName, itemParentName]);

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
  }, [dispatch, pathname, transparentSidenav, whiteSidenav]);

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
    collapses.map(
      ({ name, collapse, route, href, key, onClick, protectedLink }: any) => {
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
        } else if (onClick) {
          returnValue = (
            <Link
              href={""}
              key={key}
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
              onClick={onClick}
            >
              <SidenavItem
                color={color}
                name={name}
                active={key === itemName}
              />
            </Link>
          );
        } else if (route) {
          returnValue = (
            <Link
              href={route}
              key={key}
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
              onClick={onClick}
            >
              <SidenavItem
                color={color}
                name={name}
                active={key === itemName}
              />
            </Link>
          );
        } else {
          returnValue = (
            <Link
              href={href}
              key={key}
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={key === itemName}
              />
            </Link>
          );
        }
        if (protectedLink) {
          return (
            <ProtectedComponent
              ability={protectedLink.ability}
              target={protectedLink.target}
              key={key}
            >
              <SidenavList key={key}>{returnValue}</SidenavList>
            </ProtectedComponent>
          );
        }
        return <SidenavList key={key}>{returnValue}</SidenavList>;
      }
    );

  const { currentUser: user, isLoading } = currentUserController();

  if (isLoading) {
    return <Loading />;
  }

  const sidebarRoutes = [
    {
      type: "collapse",
      name: user.fullName,
      key: user.fullName,
      icon: <MDAvatar src={user.imageUrl} alt={user.name} size="sm" />,
      collapse: [
        {
          name: "My Profile",
          key: "my-profile",
          route: routes.userSettingsPath,
        },
        {
          name: "Logout",
          key: "logout",
          onClick: signOut,
        },
      ],
    },
    { type: "divider", key: "divider-0" },
    {
      type: "collapse",
      name: "Timesheets",
      key: "timesheets",
      icon: <Icon fontSize="medium">dataset</Icon>,
      href: "/timesheets",
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Repositories",
      key: "repositories",
      icon: <Icon fontSize="medium">dashboard</Icon>,
      href: "/repositories",
      noCollapse: true,
      protectedLink: {
        ability: abilities.change,
        target: targets.repositories,
      },
    },
    {
      type: "collapse",
      name: "Analytics",
      key: "analytics",
      icon: <Icon fontSize="medium">info</Icon>,
      protectedLink: {
        ability: abilities.view,
        target: targets.analytics,
      },
      collapse: [
        {
          name: "Company time entries",
          key: "time-entries",
          route: "/analytics/time-entries",
        },
        {
          name: "Company finances",
          key: "finances",
          route: "/analytics/finances",
          protectedLink: {
            ability: abilities.view,
            target: targets.finances,
          },
        },
      ],
    },
    {
      type: "collapse",
      name: "Users",
      key: "users",
      icon: <Icon fontSize="medium">receipt_long</Icon>,
      href: "/users",
      noCollapse: true,
      protectedLink: {
        ability: abilities.view,
        target: targets.users,
      },
    },
    {
      type: "collapse",
      name: "Customers",
      key: "customers",
      icon: <Icon fontSize="medium">receipt_long</Icon>,
      href: "/customers",
      noCollapse: true,
      protectedLink: {
        ability: abilities.change,
        target: targets.projects,
      },
    },
    {
      type: "collapse",
      name: "Projects",
      key: "projects",
      icon: <Icon fontSize="medium">book</Icon>,
      href: "/projects",
      noCollapse: true,
    },
  ];

  const renderRoutes = sidebarRoutes.map(
    ({
      type,
      name,
      icon,
      title,
      collapse,
      noCollapse,
      key,
      href,
      protectedLink,
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

      if (protectedLink) {
        return (
          <ProtectedComponent
            ability={protectedLink.ability}
            target={protectedLink.target}
            key={key}
          >
            {returnValue}
          </ProtectedComponent>
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
      <Box display="flex" flexDirection="column" height="100%">
        <List style={{ flexGrow: 1 }}>{renderRoutes}</List>
      </Box>
    </SidenavRoot>
  );
}

export default Sidenav;
