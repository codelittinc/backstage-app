/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

// Declaring props types for StatusCell
interface Props {
  icon: string;
  color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "light"
    | "white"
    | "default";
  status: string;
}

function StatusCell({ icon, color, status }: Props): JSX.Element {
  return (
    <Box display="flex" alignItems="center">
      <Box mr={1}>
        <Button variant="outlined" color={color} size="small" iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </Button>
      </Box>
      <Typography
        variant="caption"
        fontWeight="medium"
        color="text"
        sx={{ lineHeight: 0 }}
      >
        {status}
      </Typography>
    </Box>
  );
}

export default StatusCell;
