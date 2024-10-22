import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import Button from '@/components/Button';

import useSkillModalController from '../../controllers/useSkillModalController';

function SkillModal(): JSX.Element {
  const { isOpen, setIsOpen, onSubmit } = useSkillModalController();
  return (
    <>
      <Button
        variant='gradient'
        color='info'
        size='small'
        onClick={() => setIsOpen(true)}
      >
        Add Technology
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit,
        }}
      >
        <DialogTitle>Add Technology</DialogTitle>
        <DialogContent>
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
