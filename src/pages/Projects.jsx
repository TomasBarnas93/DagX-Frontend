import React, { useContext, useEffect } from "react";
import { ImageContext } from "../services/ImageContext";
import PaintingCardRightText from "../components/paintingCardRightText";
import { Flex, Box, HStack, useMediaQuery } from "@chakra-ui/react";
import PaintingCardLeftText from "../components/paintingCardLeftText";

function Projects() {
  const images = useContext(ImageContext);
  const [isMobile] = useMediaQuery("(max-width: 48em)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Separate the images into small, big and all categories
  const smallImages = images.filter(
    (image) => image.orientation === "horizontal"
  );
  const bigImages = images.filter((image) => image.orientation === "vertical");

  // Split each category into left and right arrays
  const leftSmallImages = smallImages.slice(0, smallImages.length / 2);
  const rightSmallImages = smallImages.slice(smallImages.length / 2);
  const leftBigImages = bigImages.slice(0, bigImages.length / 2);
  const rightBigImages = bigImages.slice(bigImages.length / 2);

  if (isMobile) {
    return (
      <Flex direction="column" alignItems="center">
        {images.map((image, index) => (
          <PaintingCardRightText
            key={index}
            image={image}
            index={index}
            fontSizeName={"1.5rem"}
            fontSizeSize={"1rem"}
            fontSizeAvailable={"1rem"}
          />
        ))}
      </Flex>
    );
  }
  return (
    <Flex direction="column" alignItems="center">
      {/* Render small images */}
      {leftSmallImages.map((leftImage, index) => {
        const rightImage = rightSmallImages[index];
        return (
          <HStack key={index} spacing={4} width="100%">
            <PaintingCardRightText
              image={leftImage}
              index={index}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
            <Box
              borderLeft="1px solid black"
              height="200px"
              marginTop="12rem"
            />
            {rightImage && (
              <PaintingCardLeftText
                image={rightImage}
                index={index + leftSmallImages.length}
                fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
                fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
                fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
              />
            )}
          </HStack>
        );
      })}
      {/* Render big images */}
      {leftBigImages.map((leftImage, index) => {
        const rightImage = rightBigImages[index];
        return (
          <HStack key={index} spacing={4} width="100%">
            <PaintingCardRightText
              image={leftImage}
              index={index}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
            <Box
              borderLeft="1px solid black"
              height="200px"
              marginTop="12rem"
            />
            {rightImage && (
              <PaintingCardLeftText
                image={rightImage}
                index={index + leftBigImages.length}
                fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
                fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
                fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
              />
            )}
          </HStack>
        );
      })}
    </Flex>
  );
}

export default Projects;
