import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import homeVideo from "../assets/videos/HomeVideo.mp4";
import PaintingCardRightText from "../components/paintingCardRightText";
import { ImageContext } from "../services/ImageContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Home() {
  const { images, loading } = useContext(ImageContext);
  const { t } = useTranslation();

  console.log("Total paintings loaded:", images.length);

  const getAboutWidth = () => ({ base: "90%", md: "95%" });

  const newestImage = images.length > 0 
    ? [...images].sort((a, b) => (b.order || 0) - (a.order || 0))[0] 
    : null;

  const remainingImages = newestImage 
    ? images.filter(img => img._id !== newestImage._id) 
    : images;

  if (loading) {
    return <Box textAlign="center" py={20}>Loading paintings...</Box>;
  }

  return (
    <Box>
      <Box position="relative">
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0))",
            zIndex: 2,
          }}
        />
        <Flex justifyContent="center" alignItems="center" overflow="hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="videoStyle"
            style={{ pointerEvents: "none" }}
          >
            <source src={homeVideo} type="video/mp4" />
          </video>
        </Flex>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: "spring", duration: 1.5 } }}
        viewport={{ once: true }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={5}
          mt="-2rem"
        >
          <Text
            fontSize={{ base: "1.4rem", md: "1.9rem" }}
            textAlign="center"
            fontFamily="Poiret One"
            fontWeight="bold"
            maxW="900px"
          >
            {t("AboutHead")}
          </Text>

          <Box className="underlineCustom" mt="1.5rem" />

          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign="center"
            mt="3rem"
            fontFamily="Poiret One"
            width={getAboutWidth()}
          >
            {t("About")}
          </Text>
        </Flex>
      </motion.div>

      {newestImage && (
        <Box mt="6rem" width="100%">
          <PaintingCardRightText
            image={newestImage}
            fontSizeName={{ base: "2.5rem", md: "5xl" }}
            fontSizeSize={{ base: "1.2rem", md: "2xl" }}
            fontSizeAvailable={{ base: "1.2rem", md: "2xl" }}
          />
        </Box>
      )}

      <Box mt="4rem" width="100%">
        {remainingImages.map((image) => (
          <PaintingCardRightText
            key={image._id}
            image={image}
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