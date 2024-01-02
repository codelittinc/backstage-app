import { Grid } from "@mui/material";

interface SidenavFormProps {
  children: React.ReactNode;
}

const SidenavForm = ({ children }: SidenavFormProps) => {
  return (
    <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
      <Grid item md={6} sm={12}>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SidenavForm;
