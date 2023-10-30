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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React TS components
import Badge from "@/components/Badge";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

function Authentication(): JSX.Element {
  return (
    <Card id="2fa" sx={{ overflow: "visible" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Typography variant="h5">Two-factor authentication</Typography>
        <Badge
          variant="contained"
          color="success"
          badgeContent="enabled"
          container
        />
      </Box>
      <Box p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="body2" color="text">
            Security keys
          </Typography>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <Typography variant="button" color="text" fontWeight="regular">
                No Security keys
              </Typography>
            </Box>
            <Button variant="outlined" color="dark" size="small">
              add
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="body2" color="text">
            SMS number
          </Typography>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <Typography variant="button" color="text" fontWeight="regular">
                +3012374423
              </Typography>
            </Box>
            <Button variant="outlined" color="dark" size="small">
              edit
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="body2" color="text">
            Authenticator app
          </Typography>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <Typography variant="button" color="text" fontWeight="regular">
                Not Configured
              </Typography>
            </Box>
            <Button variant="outlined" color="dark" size="small">
              set up
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default Authentication;
