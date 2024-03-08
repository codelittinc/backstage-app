import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import Link from "next/link";
import { ReactNode } from "react";

import Box from "@/components/Box";
import Typography from "@/components/Typography";

interface Props {
  [key: string]: any;
  icon: ReactNode;
  light?: boolean;
  route: string | string[];
  title: string;
}

function Breadcrumbs({
  icon,
  title,
  route,
  light = false,
}: Props): JSX.Element {
  let routes: string[] | any = route.slice(0, -1);
  routes = routes.splice(0, 1);

  return (
    <Box mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey[600],
          },
        }}
      >
        <Link href="/">
          <Typography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </Typography>
        </Link>
        {routes.map((el: string) => (
          <Link href={`/${el}`} key={el}>
            <Typography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </Typography>
          </Link>
        ))}
      </MuiBreadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;
