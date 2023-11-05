import React, { useContext } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import homeVideo from "../assets/videos/HomeVideo.mp4";
import PaintingCardRightText from "../components/paintingCardRightText";
import { ImageContext } from "../services/ImageContext";
import { useTranslation } from "react-i18next";

function Home() {
  const images = useContext(ImageContext);
  const { t, i18n } = useTranslation();

  const getAboutWidth = () => {
    switch (i18n.language) {
      case 'pl':
        return {base: "98%", md: "95%"};
      default:
        return {base: "90%", md: "95%"};
    }
  };

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
          className="videoStyle"
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
          fontSize={{ base: "1.5rem", md: "2rem" }}
          textAlign={{ base: "center", md: "center" }}
          marginLeft={{ base: 3, md: 5 }}
          marginRight={{ base: 3, md: 5 }}
          fontFamily="Poiret One"
        >{t("AboutHead")}</Text>
         <Box
              className="underlineCustom"
              marginTop={{ base: "1.5rem", md: "2rem" }}
            ></Box>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          textAlign={{ base: "center", md: "center" }}
          marginLeft={{ base: 3, md: 5 }}
          marginRight={{ base: 3, md: 5 }}
          fontFamily="Poiret One"
          mt="3rem"
          width={getAboutWidth}
        >
          {t("About")}
        </Text>
      </Flex>

      <Box marginTop="5rem" width="100%" height="auto">
        {images.slice(0, 9).map((image, index) => (
          <PaintingCardRightText
            image={image}
            index={image.originalIndex}
            key={index}
            fontSizeName={{ base: "2.5rem", md: "5xl" }}
            fontSizeSize={{ base: "1.2rem", md: "2xl" }}
            fontSizeAvailable={{ base: "1.2rem", md: "2xl" }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
