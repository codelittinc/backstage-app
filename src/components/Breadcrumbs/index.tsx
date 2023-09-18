import { ReactNode } from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Link from "next/link";

interface Props {
  icon: ReactNode;
  title: string;
  route: string | string[];
  light?: boolean;
  [key: string]: any;
}

function Breadcrumbs({
  icon,
  title,
  route,
  light = false,
}: Props): JSX.Element {
  const routes: string[] | any = route.slice(0, -1);

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
        <Typography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </Typography>
      </MuiBreadcrumbs>
      <Typography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </Typography>
    </Box>
  );
}

export default Breadcrumbs;
