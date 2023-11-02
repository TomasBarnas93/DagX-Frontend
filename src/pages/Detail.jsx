import {
  Grid,
  Image,
  Text,
  Flex,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect } from "react";
import { ImageContext } from "../services/ImageContext";
import { SlArrowLeft } from "react-icons/sl";

function Detail() {
  const { id } = useParams();
  const images = useContext(ImageContext);
  const image = images[id - 1];
  const { t, i18n } = useTranslation();

   // Get the current language key
   const langKey = i18n.language;
   const description = image.descriptions[langKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={{ base: "2rem", md: "10rem" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        mb={4}
        fontFamily="Poiret One"
        width={{ base: "90%", md: "auto" }}
      >
        <Image
          className="imageWrapper"
          src={image.url}
          alt={image.name}
          height={{ base: "auto", md: "50rem" }}
          width={{ base: "100%", md: "auto" }}
          margin="auto"
        />
        <Text fontSize={{ base: "3xl", md: "5xl" }} mt={2} fontWeight="semibold">
          {image.name}
        </Text>
        <Text fontSize={{ base: "2xl", md: "3xl" }} mt={2} fontWeight="semibold">
          {image.size}
        </Text>
        <Box className="underlineCustom" mt={{ base: "1rem", md: "2rem" }}></Box>
        <Text fontSize={{ base: "xl", md: "3xl" }} mt={5} width="60%">
        {description}
        </Text>
        <Link to="/contact">
          <Button fontSize={{ base: "xl", md: "2xl" }} h="3rem" fontFamily="Poiret One" mt={10}>
            {t("BtnAskForPrice")}
          </Button>
        </Link>
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap="0.1rem"
        width="100%"
        mt="3rem"
        marginLeft={{ base: "0", md: "5rem" }}
        gridTemplateRows="auto"
        gridAutoRows="auto"
      >
        {image.details?.map((detail, index) => (
    <Image
    mt={
      (image.details.length === 3 && index === 2) ||
      (image.details.length === 5 && index === 4) ||
      (image.details.length === 7 && index === 6)
      ? "6rem !important" 
      : "3rem !important"
    }
    objectFit="cover"
    key={index}
    className="imageWrapper"
    src={detail.subUrl}
    alt={`Detail ${index + 1}`}
    height={{ base: detail.width === "small" ? "30rem" : "auto", md: detail.width === "small" ? "50rem" : "50rem" }}
    width={{ base: detail.width === "small" ? "20rem" : "90%", md: detail.width === "small" ? "40rem" : "auto" }} 
    margin="auto"
    gridColumn={
      (image.details.length % 2 !== 0 && index === image.details.length - 1) 
        ? { base: null, md: "span 2 / auto" }
        : null
    }
  />
        ))}
      </Grid>
      <Box mt="3rem">
        <Link to="/projects">
          <IconButton
            icon={<SlArrowLeft size="2.5rem" />}
            variant="ghost"
            boxSize="3em"
            mr="2rem"
          />
        </Link>
      </Box>
    </Flex>
  );
}

export default Detail;
