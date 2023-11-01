import {
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
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Detail() {
  const { id } = useParams();
  const images = useContext(ImageContext);
  const image = images[id - 1];
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   const galleryImages = image.details?.map(detail => ({
    original: detail.subUrl,
    thumbnail: detail.subUrl,
    description: `Detail ${detail.id}`,
  })) || [];

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt="10rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        mb={4}
        fontFamily="Poiret One"
      >
        <Image
          className="imageWrapper"
          src={image.url}
          alt={image.name}
          height={{ base: "30rem", md: "50rem" }}
          margin="auto"
        />
        <Text fontSize="5xl" mt={2} fontWeight="semibold">
          {image.name}
        </Text>
        <Text fontSize="3xl" mt={2} fontWeight="semibold">
          {image.size}
        </Text>
        <Box
          className="underlineCustom"
          marginTop={{ base: "1.5rem", md: "2rem" }}
        ></Box>
        <Text fontSize="3xl" mt={5} width="60%">
          {image.description}
        </Text>
        <Link to="/contact">
          <Button fontSize="2xl" h="3rem" fontFamily="Poiret One" mt={10}>
            {t("BtnAskForPrice")}
          </Button>
        </Link>
      </Box>
      <Box mt="3rem">
      {galleryImages.length > 0 && (
          <ImageGallery items={galleryImages} />
        )}
      </Box>
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