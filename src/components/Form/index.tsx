import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import Box from "@/components/Box";
import Button from "@/components/Button";

type Props = {
  children?: React.ReactNode;
  onSave: () => void;
};

function Form({ onSave, children }: Props): JSX.Element {
  const router = useRouter();
  return (
    <Box component="form" pb={3} px={3}>
      <Grid container spacing={3}>
        {children}
      </Grid>
      <Grid container flexDirection={"row-reverse"}>
        <Grid
          item
          xs={12}
          lg={3}
          display={"flex"}
          justifyContent={"space-between"}
          pt={3}
        >
          <Button
            variant="gradient"
            color="dark"
            size="small"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button variant="gradient" color="info" size="small" onClick={onSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
