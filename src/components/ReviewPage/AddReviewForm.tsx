import { useState } from "react";
import {
  Box,
  TextField,
  Rating,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useUserStore } from "../../zustand/useUserStore";
import useShopReviewStore from "../../zustand/useShopReviewStore";

const AddReviewForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { addReview } = useShopReviewStore();
  const { account } = useUserStore();

  const [newReview, setNewReview] = useState({
    user: account,
    productQuality: 0,
    serviceQuality: 0,
    deliveryQuality: 0,
    title: "",
    comment: "",
    date: new Date().toISOString(),
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false); // Success snackbar

  const handleAdd = () => {
    if (
      !newReview.productQuality ||
      !newReview.serviceQuality ||
      !newReview.deliveryQuality ||
      !newReview.title ||
      !newReview.comment
    ) {
      setSnackbarOpen(true); // Show error snackbar
      return;
    }

    addReview({
      ...newReview,
      id: Date.now(),
    });

    setNewReview({
      user: account,
      productQuality: 0,
      serviceQuality: 0,
      deliveryQuality: 0,
      title: "",
      comment: "",
      date: new Date().toLocaleDateString(),
    });

    setSuccessSnackbarOpen(true); // Show success snackbar
    onClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h5"
            fontWeight="700"
            align="center"
            sx={{
              background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              height: 30,
            }}
          >
            Add a Review
          </Typography>
        </DialogTitle>
        <Divider sx={{ marginY: "5px" }} />
        <DialogContent>
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                Product Quality
              </Typography>
              <Rating
                value={newReview.productQuality}
                precision={0.5}
                onChange={(_e, newValue) =>
                  setNewReview({
                    ...newReview,
                    productQuality: newValue || 0,
                  })
                }
                sx={{ color: "#6a11cb" }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                Service Quality
              </Typography>
              <Rating
                value={newReview.serviceQuality}
                precision={0.5}
                onChange={(_e, newValue) =>
                  setNewReview({
                    ...newReview,
                    serviceQuality: newValue || 0,
                  })
                }
                sx={{ color: "#2575fc" }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                Delivery Quality
              </Typography>
              <Rating
                value={newReview.deliveryQuality}
                precision={0.5}
                onChange={(_e, newValue) =>
                  setNewReview({
                    ...newReview,
                    deliveryQuality: newValue || 0,
                  })
                }
                sx={{ color: "#34d399" }}
              />
            </Box>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={newReview.title}
              onChange={(e) =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              InputProps={{
                sx: { borderRadius: "12px" },
              }}
            />
            <TextField
              label="Comment"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              InputProps={{
                sx: { borderRadius: "12px" },
              }}
            />
          </Stack>
        </DialogContent>
        <Divider sx={{ marginY: "10px" }} />
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#6a11cb",
              borderColor: "#6a11cb",
              borderRadius: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                background: "rgba(106, 17, 203, 0.1)",
                borderColor: "#5a0ebc",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              color: "white",
              fontWeight: "bold",
              borderRadius: "12px",
              padding: "10px 20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #5a0ebc, #1f66e1)",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for validation error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please fill out all fields before submitting!
        </Alert>
      </Snackbar>

      {/* Snackbar for success */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSuccessSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Review added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddReviewForm;
