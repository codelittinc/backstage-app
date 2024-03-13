import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import { onDeleteAction } from "@/app/_presenters/utils/actions";
import Box from "@/components/Box";
import Button from "@/components/Button";

type Props = {
  cancelPath?: string;
  children?: React.ReactNode;
  onDelete?: () => void;
  onSave: () => void;
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
                  onDeleteAction(onDelete);
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
