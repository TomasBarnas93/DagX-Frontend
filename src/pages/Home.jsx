import React, { useContext } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import homeVideo from "../assets/videos/HomeVideo.mp4";
import PaintingCardRightText from "../components/paintingCardRightText";
import { ImageContext } from "../services/ImageContext";

function Home() {
  const images = useContext(ImageContext);

  return (
    <Box>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6rem",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0))",
        }}
      />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
        textAlign="justify"
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: "80vh",
            filter: "grayscale(100%) contrast(170%) brightness(90%)",
            opacity: 0.4,
            marginTop: "6rem",
          }}
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
        <Box
          width="100%"
          height="6rem"
          background="linear-gradient(to bottom, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0))"
          marginTop="-0.05rem"
        />
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign={{ base: "center", md: "justify" }}
          marginLeft={{ base: 3, md: 0 }}
          marginRight={{ base: 3, md: 0 }}
          marginTop={10}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est
          deleniti ea labore...
        </Text>
      </Flex>

      <Box marginTop="30rem" width="100%" height="auto">
      {images.slice(0, 9).map((image, index) => (
          <PaintingCardRightText image={image} index={index} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
