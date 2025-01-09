import { keyframes } from "@mui/material";

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInFromRight = keyframes`
  from {
    transform: translateX(50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
