import { MenuItemProps } from "@mui/material";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { FC, ReactNode, forwardRef } from "react";

import MDBox from "@/components/Box";
import MDTypography from "@/components/Typography";

import menuItem from "./styles";

interface Props extends MenuItemProps {
  [key: string]: any;
  icon: ReactNode;
  title: string;
}

const NotificationItem: FC<Props> = forwardRef(
  ({ icon, title, ...rest }, ref) => (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
      <MDBox
        component={Link}
        py={0.5}
        display="flex"
        alignItems="center"
        lineHeight={1}
      >
        <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
          {icon}
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
          {title}
        </MDTypography>
      </MDBox>
    </MenuItem>
  )
);

NotificationItem.displayName = "NotificationItem";

export default NotificationItem;
