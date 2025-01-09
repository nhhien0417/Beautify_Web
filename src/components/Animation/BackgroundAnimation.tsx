import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animation1 from "../../assets/loginAnimation.json";
import animation2 from "../../assets/signupAnimation.json";
import { useRef } from "react";
import { Box } from "@mui/material";

const Animation = ({ type }: { type: number }) => {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  return (
    <Box width="auto" alignSelf="center">
      <Lottie
        onComplete={() => {
          animationRef.current?.setDirection(-1);
        }}
        lottieRef={animationRef}
        loop={true}
        animationData={type === 1 ? animation1 : animation2}
      />
    </Box>
  );
};

export default Animation;
