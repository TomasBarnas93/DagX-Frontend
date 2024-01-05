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
import React, { useContext, useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { ImageContext } from "../services/ImageContext";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../services/helpers/firebase";

function Detail() {
  const { id } = useParams();
  const images = useContext(ImageContext);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: true,
    xl: false,
    sm: true,
  });

  const fetchImageById = async (imageId) => {
    try {
      const imageRef = dbRef(db, `images/image${imageId}`);
      const imageSnap = await get(imageRef);
      const imageData = imageSnap.val();

      if (!imageData) {
        throw new Error("Image not found");
      }
      const detailsArray = [];
      if (imageData.detailImages) {
        for (const detailKey in imageData.detailImages) {
          const detailData = imageData.detailImages[detailKey];
          detailsArray.push({
            subUrl: detailData.subUrl,
            width: detailData.width,
          });
        }
      }

      return {
        ...imageData,
        details: detailsArray,
        originalIndex: imageId - 1,
      };
    } catch (error) {
      console.error("Error fetching image by ID:", error);
      throw error;
    }
  };

  const sortedDetails = React.useMemo(() => {
    if (isMobile && image?.details) {
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
    return image?.details || [];
  }, [isMobile, image?.details]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchImageData = async () => {
      try {
        setIsLoading(true);
        const fetchedImage = await fetchImageById(id);
        setImage(fetchedImage);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    if (!images || images.length === 0) {
      fetchImageData();
    } else {
      const currentImage = images[id - 1];
      if (currentImage) {
        setImage(currentImage);
      } else {
        setError(new Error("Image not found"));
      }
      setIsLoading(false);
    }
  }, [id, images]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !image) {
    return <div>Error: {error ? error.message : "Image not found"}</div>;
  }

  const langKey = i18n.language;
  const description = image?.descriptions[langKey];

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
        marginLeft={{ base: "0", xl: "5rem" }}
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
              xl: detail.width === "small" ? "40rem" : "95%",
              sm: detail.width === "small" ? "30rem" : "80%",
              md: detail.width === "small" ? "30rem" : "80%",
            }}
            margin="auto"
            gridColumn={
              sortedDetails.length % 2 !== 0 &&
              index === sortedDetails.length - 1
                ? { base: null, md: "1fr ", lg: "span 2 / auto" }
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
