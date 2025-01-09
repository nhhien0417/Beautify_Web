import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Product from "../../../entities/Product";
import useProductStore from "../../../zustand/useProductStore";
import { useUserStore } from "../../../zustand/useUserStore";

interface Props {
  product: Product;
  onClose: () => void;
}

const WriteReview = ({ product, onClose }: Props) => {
  const { account } = useUserStore();
  const [rating, setRating] = useState<number | null>(0);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");

  const { addReview } = useProductStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // Can be "success", "info", "warning", or "error"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!summary || !details || !rating) {
      setSnackbar({
        open: true,
        message: "Please fill out all required fields.",
        severity: "error",
      });
      return;
    }

    const newReview = {
      id: Date.now(),
      user: account,
      rating: rating,
      date: new Date().toISOString(),
      summary: summary,
      detail: details,
    };

    addReview(product.id, newReview);

    setRating(0);
    setSummary("");
    setDetails("");

    setSnackbar({
      open: true,
      message: "Review submitted successfully!",
      severity: "success",
    });

    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        px: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        margin: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, textAlign: "center", margin: "15px" }}
      >
        Write a Review
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            bgcolor: "#E5EFFA",
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          {/* Product Image */}
          <Box sx={{ mr: 2 }}>
            <img
              src={product.images[0]}
              alt="Product"
              style={{
                width: 60,
                height: 60,
                aspectRatio: 1,
                objectFit: "cover",
                borderRadius: 5,
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Paper
              sx={{
                bgcolor: "#76A188",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              <Typography
                p={0.5}
                variant="subtitle2"
                color="white"
                fontWeight={600}
              >
                {product.category}
              </Typography>
            </Paper>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {product.name}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="subtitle1" fontWeight="600">
              Review Summary
              <Typography component="span" sx={{ color: "red", ml: 0.5 }}>
                *
              </Typography>
            </Typography>
            <TextField
              placeholder="Summarize your review"
              variant="outlined"
              fullWidth
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "50px", // Adjust height of the text input
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="subtitle1" fontWeight="600">
              Overall Rating
              <Typography component="span" sx={{ color: "red", ml: 0.5 }}>
                *
              </Typography>
            </Typography>
            <Box>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                precision={0.5}
                sx={{ color: "black" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="subtitle1" fontWeight="600">
              Detailed Review
              <Typography component="span" sx={{ color: "red", ml: 0.5 }}>
                *
              </Typography>
            </Typography>
            <TextField
              placeholder="Write detailed reviews"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          marginTop: 1,
          alignSelf: "center",
          height: "50px",
          borderRadius: 10,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Submit Review
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "error" | "success"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WriteReview;
