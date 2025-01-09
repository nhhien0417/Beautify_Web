// CategoryDetail.tsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  category: { id: number; name: string } | null;
}

const CategoryDetail = ({ open, onClose, category }: Props) => {
  if (!category) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>Category Details</DialogTitle>
      <DialogContent>
        <TextField
          label="ID"
          value={category.id}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Name"
          value={category.name}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDetail;
