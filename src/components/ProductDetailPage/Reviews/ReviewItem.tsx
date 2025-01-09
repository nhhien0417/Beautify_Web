import { useState, MouseEvent } from "react";
import {
  Box,
  Typography,
  Rating,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useProductStore from "../../../zustand/useProductStore";
import { useUserStore } from "../../../zustand/useUserStore";
import ProductReview from "../../../entities/ProductReview";
import { formatDate } from "../../../services/date";

interface Props {
  productId: number;
  review: ProductReview;
}

const ReviewItem = ({ productId, review }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [rating, setRating] = useState<number>(review.rating || 0);
  const [summary, setSummary] = useState(review.summary);
  const [detail, setDetail] = useState(review.detail);
  const [, setError] = useState<{ summary: boolean; detail: boolean }>({
    summary: false,
    detail: false,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const { isAuthenticated, account } = useUserStore();
  const { editReview, removeReview } = useProductStore();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleSave = () => {
    // Validate fields
    if (!summary.trim() || !detail.trim()) {
      setError({
        summary: !summary.trim(),
        detail: !detail.trim(),
      });
      setSnackbarMessage("Summary and detail cannot be empty");
      setSnackbarOpen(true); // Open Snackbar
      return;
    }

    setIsEditing(false);
    const updatedReview = { rating, summary, detail };
    editReview(productId, review.id, updatedReview);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setRating(review.rating);
    setSummary(review.summary);
    setDetail(review.detail);
    setError({ summary: false, detail: false });
  };

  const handleDelete = () => {
    handleMenuClose();
    removeReview(productId, review.id);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      p={2}
      mb={3}
      borderRadius={2}
      boxShadow={2}
      sx={{ backgroundColor: "#fff" }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={review.user.image} />
          <Box display="flex" flexDirection="column">
            <Typography fontWeight="600" variant="h6">
              {review.user.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontStyle: "italic" }}
            >
              {review.user.email}
            </Typography>
          </Box>
        </Box>
        {/* Menu Button */}
        {(account.role.name === "ADMIN" ||
          (isAuthenticated && account.id === review.user.id)) && (
          <IconButton onClick={handleMenuOpen} disabled={isEditing}>
            <MoreVertIcon />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiMenu-paper": {
              backgroundColor: "#FBFAF1",
              color: "505050",
              width: "200px",
              borderRadius: "8px",
            },
          }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>

      {/* Rating and Summary */}
      <Box display="flex" alignItems="center" mt={1}>
        {isEditing ? (
          <Rating
            value={rating}
            precision={0.5}
            onChange={(_, newValue) => setRating(newValue ?? 0)}
            size="small"
            sx={{
              "& .MuiRating-iconFilled": { color: "#00aaff" },
              "& .MuiRating-iconEmpty": { color: "#CCC" },
            }}
          />
        ) : (
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            size="small"
            sx={{
              "& .MuiRating-iconFilled": { color: "#00aaff" },
              "& .MuiRating-iconEmpty": { color: "#CCC" },
            }}
          />
        )}

        {isEditing ? (
          <TextField
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ml: 1, width: "auto" }}
            placeholder="Summary cannot be empty"
          />
        ) : (
          <Typography ml={1} fontWeight="600" color="text.primary">
            {review.summary}
          </Typography>
        )}
      </Box>

      {/* Detail */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        {isEditing ? (
          <TextField
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            placeholder="Detail cannot be empty"
          />
        ) : (
          <Typography mt={0.5} color="text.primary" variant="body1">
            {review.detail}
          </Typography>
        )}

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <Box ml={1} display="flex">
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Save
            </Button>
          </Box>
        )}

        {/* Date (hidden when editing) */}
        {!isEditing && (
          <Typography color="textSecondary" variant="body2">
            {formatDate(review.date)}
          </Typography>
        )}
      </Box>

      {/* Divider */}
      {review.response && <Divider sx={{ my: 1.5 }} />}

      {/* Response */}
      {review.response && (
        <Typography
          sx={{
            mt: 1,
            pl: 2,
            color: "secondary.main",
            fontStyle: "italic",
            borderLeft: 2,
            borderColor: "secondary.main",
          }}
        >
          {review.response}
        </Typography>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewItem;
