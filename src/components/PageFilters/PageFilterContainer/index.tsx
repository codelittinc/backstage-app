import { Card, Grid } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const PageFilterContainer = ({ children }: Props) => {
  return (
    <Grid>
      <Card>
        <Grid container p={2}>
          <Grid item xs={12} display={"flex"}>
            {children}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PageFilterContainer;
