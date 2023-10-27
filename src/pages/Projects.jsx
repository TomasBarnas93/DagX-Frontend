import React, { useContext, useEffect } from "react";
import { ImageContext } from "../services/ImageContext";
import PaintingCardRightText from "../components/paintingCardRightText";
import { Flex, Box, HStack } from "@chakra-ui/react";
import PaintingCardLeftText from "../components/paintingCardLeftText";

function Projects() {
  const images = useContext(ImageContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Separate the images into small, big and all categories
  const smallImages = images.filter(image => image.orientation === "horizontal");
  const bigImages = images.filter(image => image.orientation === "vertical");
  
  // Split each category into left and right arrays
  const leftSmallImages = smallImages.slice(0, smallImages.length / 2);
  const rightSmallImages = smallImages.slice(smallImages.length / 2);
  const leftBigImages = bigImages.slice(0, bigImages.length / 2);
  const rightBigImages = bigImages.slice(bigImages.length / 2);

  return (
    <Flex direction="column" alignItems="center">
      {/* Render small images */}
      {leftSmallImages.map((leftImage, index) => {
        const rightImage = rightSmallImages[index];
        return (
          <HStack key={index} spacing={4} width="100%">
            <PaintingCardRightText image={leftImage} index={index} />
            <Box borderLeft="1px solid black" height="200px" marginTop="12rem" />
            {rightImage && <PaintingCardLeftText image={rightImage} index={index + leftSmallImages.length} />}
          </HStack>
        );
      })}
      {/* Render big images */}
      {leftBigImages.map((leftImage, index) => {
        const rightImage = rightBigImages[index];
        return (
          <HStack key={index} spacing={4} width="100%">
            <PaintingCardRightText image={leftImage} index={index} />
            <Box borderLeft="1px solid black" height="200px" marginTop="12rem"/>
            {rightImage && <PaintingCardLeftText image={rightImage} index={index + leftBigImages.length} />}
          </HStack>
        );
      })}
    </Flex>
  );
}

export default Projects;
