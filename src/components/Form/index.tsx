import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import Box from "@/components/Box";
import Button from "@/components/Button";

type Props = {
  children?: React.ReactNode;
  onSave: () => void;
  cancelPath?: string;
  onDelete?: () => void;
};

function Form({ onSave, cancelPath, onDelete, children }: Props): JSX.Element {
  const router = useRouter();
  return (
    <Box component="form" pb={3} px={3}>
      <Grid container spacing={3}>
        {children}
      </Grid>
      <Grid container flexDirection={"row-reverse"}>
        <Grid item xs={12} display={"flex"} justifyContent={"flex-end"} pt={3}>
          <Button
            variant="gradient"
            color="dark"
            size="small"
            onClick={() =>
              cancelPath ? router.push(cancelPath) : router.back()
            }
          >
            Cancel
          </Button>
          {!!onDelete && (
            <Box ml={1}>
              <Button
                variant="gradient"
                color="error"
                size="small"
                ml={2}
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this item?")
                  ) {
                    onDelete();
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          )}
          <Box ml={1}>
            <Button
              variant="gradient"
              color="info"
              size="small"
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
