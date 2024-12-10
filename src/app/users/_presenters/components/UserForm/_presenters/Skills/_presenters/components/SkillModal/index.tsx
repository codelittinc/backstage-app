import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Button from "@/components/Button";

import useSkillModalController from "../../controllers/useSkillModalController";

function SkillModal(): JSX.Element {
  const { isOpen, setIsOpen, onSubmit } = useSkillModalController();
  return (
    <>
      <Button
        variant="gradient"
        color="info"
        size="small"
        onClick={() => setIsOpen(true)}
      >
        Add Technology
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit,
        }}
      >
        <DialogTitle>Add Technology</DialogTitle>
        <DialogContent
          style={{
            width: "500px",
          }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Technology name:"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="profession-area-label">Profession Area</InputLabel>
            <Select
              labelId="profession-area-label"
              id="professionArea"
              name="professionArea"
              label="Profession Area"
              defaultValue="engineering"
              style={{
                height: "40px",
              }}
            >
              <MenuItem value="design">Design</MenuItem>
              <MenuItem value="engineering">Engineering</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SkillModal;
