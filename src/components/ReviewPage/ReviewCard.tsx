import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { MoreHorizRounded, Edit as EditIcon } from "@mui/icons-material";
import ShopReview from "../../entities/ShopReview";
import useShopReviewStore from "../../zustand/useShopReviewStore";
import { useUserStore } from "../../zustand/useUserStore";
import { formatDate } from "../../services/date";

interface ReviewCardProps {
  review: ShopReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempTitle, setTempTitle] = useState(review.title);
  const [tempComment, setTempComment] = useState(review.comment);
  const [tempProductQuality, setTempProductQuality] = useState(
    review.productQuality || 0
  );
  const [tempServiceQuality, setTempServiceQuality] = useState(
    review.serviceQuality || 0
  );
  const [tempDeliveryQuality, setTempDeliveryQuality] = useState(
    review.deliveryQuality || 0
  );
  const [response, setResponse] = useState(review.response || "");
  const [tempResponse, setTempResponse] = useState(review.response || "");
  const [isEditingResponse, setIsEditingResponse] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Snackbar State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Zustand store actions
  const { deleteReview, updateReview, addResponse } = useShopReviewStore();

  //
  const { account, isAuthenticated } = useUserStore();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    // Validation for required fields
    if (
      !tempTitle ||
      !tempComment ||
      tempProductQuality === 0 ||
      tempServiceQuality === 0 ||
      tempDeliveryQuality === 0
    ) {
      setSnackbarMessage("Please fill in all fields before saving.");
      setSnackbarOpen(true);
      return;
    }

    setIsEditing(false);
    setAnchorEl(null);
    // Save the edited review to the store
    const updatedReview = {
      ...review,
      title: tempTitle,
      comment: tempComment,
      productQuality: tempProductQuality,
      serviceQuality: tempServiceQuality,
      deliveryQuality: tempDeliveryQuality,
    };
    updateReview(updatedReview);
  };

  const handleCancel = () => {
    setTempTitle(review.title);
    setTempComment(review.comment);
    setTempProductQuality(review.productQuality || 0);
    setTempServiceQuality(review.serviceQuality || 0);
    setTempDeliveryQuality(review.deliveryQuality || 0);
    setIsEditing(false);
    setAnchorEl(null);
  };

  const handleSaveResponse = () => {
    addResponse(review.id, tempResponse); // Call the store action to add the response
    setResponse(tempResponse);
    setIsEditingResponse(false);
  };

  const handleDelete = () => {
    deleteReview(review.id);
    handleMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      mt={2}
      p={2}
      borderRadius={2}
      boxShadow={1}
      bgcolor="#ECEBDE"
      sx={{ width: "100%" }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={review.user.image} />
          <Typography variant="subtitle1" fontWeight="bold">
            {review.user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDate(review.date)}
          </Typography>
        </Box>

        {isAuthenticated && review.user.id === account.id && (
          <IconButton onClick={handleMenuOpen} disabled={isEditing}>
            <MoreHorizRounded />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              setIsEditing(true);
              setAnchorEl(null);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>

      {/* Ratings */}
      {isEditing ? (
        <Box mt={1} display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" fontWeight="bold">
              Product Quality:
            </Typography>
            <Rating
              value={tempProductQuality}
              onChange={(_, newValue) => setTempProductQuality(newValue || 0)}
              precision={0.5}
              size="small"
            />
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" fontWeight="bold">
              Service Quality:
            </Typography>
            <Rating
              value={tempServiceQuality}
              onChange={(_, newValue) => setTempServiceQuality(newValue || 0)}
              precision={0.5}
              size="small"
            />
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" fontWeight="bold">
              Delivery Quality:
            </Typography>
            <Rating
              value={tempDeliveryQuality}
              onChange={(_, newValue) => setTempDeliveryQuality(newValue || 0)}
              precision={0.5}
              size="small"
            />
          </Box>
        </Box>
      ) : (
        <Rating
          value={
            (review.productQuality +
              review.serviceQuality +
              review.deliveryQuality) /
            3
          }
          precision={0.5}
          readOnly
          size="small"
        />
      )}

      {/* Title */}
      {isEditing ? (
        <Box mt={1}>
          <Typography variant="subtitle2" fontWeight="bold">
            Title:
          </Typography>
          <TextField
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Edit title"
          />
        </Box>
      ) : (
        <Typography variant="subtitle1" fontWeight="bold">
          {review.title}
        </Typography>
      )}

      {/* Comment */}
      <Box mt={1}>
        {isEditing ? (
          <Box mt={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              Comment:
            </Typography>
            <TextField
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={3}
              placeholder="Edit comment"
            />
          </Box>
        ) : (
          <Box>
            <Typography
              variant="body2"
              color="textPrimary"
              mt={1}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: isExpanded ? "unset" : 3,
                lineHeight: 1.5,
                whiteSpace: isExpanded ? "normal" : "nowrap",
              }}
            >
              {review.comment}
            </Typography>

            {/* Show "Read More" or "Read Less" */}
            {!isExpanded && review.comment.length > 100 && (
              <Button
                sx={{ mt: 1 }}
                size="small"
                onClick={() => setIsExpanded(true)} // Expand text
              >
                Read More
              </Button>
            )}

            {isExpanded && (
              <Button
                sx={{ mt: 1 }}
                size="small"
                onClick={() => setIsExpanded(false)} // Collapse text
              >
                Read Less
              </Button>
            )}
          </Box>
        )}
      </Box>

      {/* Save/Cancel Buttons for Main Editing */}
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button size="small" onClick={handleCancel} sx={{ ml: 1 }}>
            Cancel
          </Button>
        </Box>
      )}

      {/* Response Section */}
      {response && !isEditingResponse ? (
        <Box
          mt={2}
          p={1}
          bgcolor="#D8C4B6"
          borderRadius={1}
          display="flex"
          alignItems="center"
        >
          <Typography
            fontWeight="bold"
            variant="body2"
            color="textSecondary"
            sx={{ flexGrow: 1 }}
          >
            Response: {response}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setIsEditingResponse(true)}
            sx={{ ml: 1 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : isEditingResponse ? (
        <Box mt={2}>
          <TextField
            placeholder="Edit your response..."
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={tempResponse}
            onChange={(e) => setTempResponse(e.target.value)}
          />
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={handleSaveResponse}
            sx={{ mt: 1 }}
          >
            Save
          </Button>
          <Button
            size="small"
            onClick={() => setIsEditingResponse(false)}
            sx={{ mt: 1, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsEditingResponse(true)}
          sx={{
            fontWeight: "bold",
            mt: 2,
            backgroundColor: "#D39D55",
            ":hover": { backgroundColor: "#489C7E" },
          }}
        >
          Add Response
        </Button>
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

export default ReviewCard;
