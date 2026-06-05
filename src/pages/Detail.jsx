import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Image,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import { SlArrowLeft } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { ImageContext } from "../services/ImageContext";
import { motion } from "framer-motion";

function Detail() {
  const { id } = useParams();
  const { images, loading } = useContext(ImageContext);
  const [image, setImage] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (images.length > 0) {
      const foundImage = images.find((img) => 
        img._id === id || String(img.originalIndex + 1) === id
      );
      setImage(foundImage);
    }
  }, [id, images]);

  if (loading) return <Box textAlign="center" mt="10rem">Loading...</Box>;
  if (!image) return <Box textAlign="center" mt="10rem">Painting not found</Box>;

  const langKey = i18n.language;
  const description = image.descriptions?.[langKey] || image.descriptions?.sv || "";

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={{ base: "2rem", md: "8rem" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        mb={8}
        fontFamily="Poiret One"
        width={{ base: "90%", md: "auto" }}
      >
        <Image
          className="imageWrapper"
          src={image.url}
          alt={image.name || image.title}
          height={{ base: "auto", md: "50rem", xl: "55rem" }}
          width={{ base: "100%", md: "auto" }}
          maxW="1000px"
          objectFit="contain"
        />

        <Text fontSize={{ base: "3xl", lg: "4xl", xl: "5xl" }} mt={8} fontWeight="semibold">
          {image.name || image.title}
        </Text>

        <Box className="underlineCustom" mt={6} />

        <Text fontSize={{ base: "2xl", lg: "3xl" }} mt={4} fontWeight="semibold">
          {image.size}
        </Text>

        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          mt={8}
          width={{ base: "90%", lg: "70%" }}
          lineHeight="1.7"
        >
          {description}
        </Text>
      </Box>

      {image.details && image.details.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr",
            lg: "repeat(2, 1fr)",
          }}
          gap={6}
          width="100%"
          maxW="1400px"
          mt="4rem"
          px={4}
        >
          {image.details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                className="imageWrapper"
                src={detail.subUrl}
                alt={`Detail ${index + 1}`}
                objectFit="cover"
                width="100%"
                height="auto"
                borderRadius="md"
              />
            </motion.div>
          ))}
        </Grid>
      )}

      <Box mt="4rem" mb="6rem">
        <Link to="/projects">
          <IconButton
            icon={<SlArrowLeft size="2.5rem" />}
            variant="ghost"
            boxSize="3.5em"
            aria-label="Back to projects"
          />
        </Link>
      </Box>
    </Flex>
  );
}

export default Detail;