import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

// Custom Step Icons
const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;

  // Define icons
  const icons: { [index: string]: React.ReactElement } = {
    1: <HourglassEmptyIcon />,
    2: <LocalShippingIcon />,
    3: <CheckCircleOutlineIcon />,
  };

  // Logic for icon background color
  const isCompletedStep = String(icon) === "3" && (active || completed);

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isCompletedStep
          ? "#4caf50" // Green for active or completed "Completed" step
          : completed
            ? "#4caf50" // Green for completed steps
            : active
              ? "#ff7043" // Orange for active step
              : "#e0e0e0", // Gray for inactive steps
        color: completed || active ? "white" : "black",
      }}
    >
      {icons[String(icon)]}
    </Box>
  );
};

const StatusTimeline: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = ["Preparing", "Delivering", "Completed"];

  return (
    <Box
      sx={{
        width: "100%",
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Order Status
      </Typography>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => {
          const isCompletedActiveStep = index === 2 && currentStep === 2;
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon} sx={{ mt: -1 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: index === currentStep ? "bold" : "normal",
                    color: isCompletedActiveStep
                      ? "#4caf50" // Green for active "Completed" step
                      : index === currentStep
                        ? "#ff7043" // Orange for other active steps
                        : index < currentStep
                          ? "#4caf50" // Green for completed steps
                          : "text.secondary", // Gray for upcoming steps
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default StatusTimeline;
