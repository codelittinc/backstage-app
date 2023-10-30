import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Theme } from "@mui/material/styles";
import { ReactNode } from "react";

import MDBox from "@/components/Box";
import { useMaterialUIController } from "@/theme";

import { item, itemArrow, itemContent } from "./styles/sidenavItem";

interface Props {
  [key: string]: any;
  active?: boolean | string;
  children?: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark";
  name: string;
  nested?: boolean;
  open?: boolean;
}

function SidenavItem({
  color = "info",
  name,
  active,
  nested,
  children,
  open,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  return (
    <>
      <ListItem
        {...rest}
        component="li"
        sx={(theme) =>
          item(theme, {
            active,
            color,
            transparentSidenav,
            whiteSidenav,
            darkMode,
          })
        }
      >
        <MDBox
          sx={(theme: Theme): any =>
            itemContent(theme, {
              active,
              miniSidenav,
              name,
              open,
              nested,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemText primary={name} />
          {children && (
            <Icon
              component="i"
              sx={(theme) =>
                itemArrow(theme, {
                  open,
                  miniSidenav,
                  transparentSidenav,
                  whiteSidenav,
                  darkMode,
                })
              }
            >
              expand_less
            </Icon>
          )}
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit {...rest}>
          {children}
        </Collapse>
      )}
    </>
  );
}

export default SidenavItem;
