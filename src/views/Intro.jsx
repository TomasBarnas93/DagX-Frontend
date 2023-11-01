import React, { useEffect, useRef } from "react";
import { Box, Image, useBreakpointValue, keyframes } from "@chakra-ui/react";
import introImg from "../assets/images/introLogo4.JPG";

const Intro = ({ onAnimationEnd }) => {
  const marginLeft = useBreakpointValue({ base: "3rem", md: "auto" });
  const width = useBreakpointValue({ base: "90rem", md: "auto" });
  const height = useBreakpointValue({ base: "60rem", md: "auto" });

  const introRef = useRef(null);

  useEffect(() => {
    const introElement = introRef.current;
    introElement.addEventListener('animationend', onAnimationEnd);
    return () => {
      introElement.removeEventListener('animationend', onAnimationEnd);
    };
  }, [onAnimationEnd]);

  const slideOut = keyframes`
    0%, 50% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-100%); opacity: 0; }
  `;

  return (
    <>
      <Box
        ref={introRef}
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
        animation={`${slideOut} 2s forwards`}
        animationDelay="1.2s"
      >
        <Box marginLeft={marginLeft}>
          <Image
            src={introImg}
            alt="Intro Logo"
            minWidth={width}
            minHeight={height}
          />
        </Box>
      </Box>
    </>
  );
};

export default Intro;