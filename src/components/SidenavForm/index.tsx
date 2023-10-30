import { Grid } from "@mui/material";

import Sidenav from "./Sidenav";
import Box from "../Box";

interface SidenavFormProps {
  children: React.ReactNode;
  sidebarItems: { href: string, icon: string; label: string; }[];
}

const SidenavForm = ({ sidebarItems, children }: SidenavFormProps) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav items={sidebarItems} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box>
            <Grid container spacing={3}>
              {children}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SidenavForm;
