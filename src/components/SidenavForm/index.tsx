import { Grid } from "@mui/material";
import Box from "../Box";
import Sidenav from "./Sidenav";

interface SidenavFormProps {
  sidebarItems: { icon: string; label: string; href: string }[];
  children: React.ReactNode;
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