import {
  Grid,
  Image,
  Text,
  Flex,
  Button,
  Box,
  IconButton,
  useBreakpointValue,
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
  const isMobile = useBreakpointValue({ base: true, md: true, lg: true, xl: false, sm: true });

  // Get the current language key
  const langKey = i18n.language;
  const description = image.descriptions[langKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sort the details array such that "small" images come first on mobile screens
  const sortedDetails = React.useMemo(() => {
    if (isMobile) {
      return [...image.details].sort((a, b) => {
        if (a.width === "small" && b.width !== "small") {
          return -1;
        }
        if (a.width !== "small" && b.width === "small") {
          return 1;
        }
        return 0;
      });
    }
    return image.details;
  }, [isMobile, image.details]);

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
          height={{ base: "auto", md: "50rem", xl: "50rem" }}
          width={{ base: "100%", md: "auto" }}
          margin="auto"
        />
        <Text
          fontSize={{ base: "3xl", lg: "4xl", xl: "5xl" }}
          mt={6}
          fontWeight="semibold"
        >
          {image.name}
        </Text>
        <Text
          fontSize={{ base: "2xl", lg: "2xl", xl: "3xl" }}
          mt={2}
          fontWeight="semibold"
        >
          {image.size}
        </Text>
        <Box
          className="underlineCustom"
          mt={{ base: "1rem", md: "2rem" }}
        ></Box>
        <Text
          fontSize={{ base: "xl", lg: "2xl", xl: "3xl", md: "3xl" }}
          mt={5}
          width={{ base: "80%", lg: "70%", xl: "60%", md: "80%" }}
        >
          {description}
        </Text>
        <Link to="/contact">
          <Button
            fontSize={{ base: "xl", lg: "xl", xl: "2xl" }}
            h="3rem"
            fontFamily="Poiret One"
            mt={10}
          >
            {t("BtnAskForPrice")}
          </Button>
        </Link>
      </Box>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "1fr",
          lg: "1fr 1fr",
          xl: "1fr 1fr",
          sm: "1fr",
        }}
        gap="0.1rem"
        width="100%"
        mt="3rem"
        marginLeft={{ base: "0",  xl: "5rem"}}
        gridTemplateRows="auto"
        gridAutoRows="auto"
      >
        {sortedDetails.map((detail, index) => (
          <Image
            mt={
              (sortedDetails.length === 3 && index === 2) ||
              (sortedDetails.length === 5 && index === 4) ||
              (sortedDetails.length === 7 && index === 6)
                ? "6rem !important"
                : "3rem !important"
            }
            objectFit="cover"
            key={index}
            className="imageWrapper"
            src={detail.subUrl}
            alt={`Detail ${index + 1}`}
            height={{
              base: detail.width === "small" ? "30rem" : "auto",
              lg: detail.width === "small" ? "90%" : "auto",
              xl: detail.width === "small" ? "50rem" : "50rem",
              sm: detail.width === "small" ? "40rem" : "auto",
              md: detail.width === "small" ? "40rem" : "auto",
            }}
            width={{
              base: detail.width === "small" ? "20rem" : "90%",
              lg: detail.width === "small" ? "80%" : "90%",
              xl: detail.width === "small" ? "40rem" : "auto",
              sm: detail.width === "small" ? "30rem" : "80%",
              md: detail.width === "small" ? "30rem" : "80%",
            }}
            margin="auto"
            gridColumn={
              sortedDetails.length % 2 !== 0 &&
              index === sortedDetails.length - 1
                ? { base: null, md: "1fr ",lg: "span 2 / auto" }
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
