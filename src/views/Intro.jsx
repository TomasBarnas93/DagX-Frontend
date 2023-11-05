import React from "react";
import { Box, Image, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import introImg from "../assets/images/introLogo.JPG";

const MotionBox = motion(Box);

const Intro = ({ onAnimationEnd }) => {
  const marginLeft = useBreakpointValue({ base: "-4rem", md: "auto" }); 
  const scaleValue = useBreakpointValue({ base: "0.8", md: "1" }); 
  const width = useBreakpointValue({ base: "90rem", md: "auto" });
  const height = useBreakpointValue({ base: "60rem", md: "auto" });

  return (
    <MotionBox
      width="100vw"
      height="100vh"
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.50"
      backgroundImage={`url(${introImg})`}
      backgroundSize="cover"
      backgroundPosition="center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.8, onComplete: onAnimationEnd }}
    >
      <Box marginLeft={marginLeft} transform={`scale(${scaleValue})`}>
        <Image src={introImg} alt="Intro Logo" minWidth={width} minHeight={height} />
      </Box>
    </MotionBox>
  );
};

export default Intro;
