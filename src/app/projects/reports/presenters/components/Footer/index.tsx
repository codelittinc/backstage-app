import Box from "@/components/Box";
import { Icon, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      mt={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      color="text"
    >
      <Typography variant="caption" fontWeight="medium">
        &copy; {new Date().getFullYear()}, made with
      </Typography>
      <Typography variant="caption" fontWeight="medium">
        <Box color="text" mb={-0.5} mx={0.25}>
          <Icon color="error" fontSize="inherit">
            favorite
          </Icon>
        </Box>
      </Typography>
      <Typography variant="caption" fontWeight="medium">
        by
      </Typography>
      <Typography variant="caption" fontWeight="medium">
        <Link href={"https://codelitt.com"} target="_blank">
          &nbsp;Codelitt&nbsp;
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
