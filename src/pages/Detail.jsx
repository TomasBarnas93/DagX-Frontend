import {
  Image,
  Text,
  Flex,
  Button,
  Box,
  Grid,
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
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt="10rem"
    >
      <Box
        textAlign="center"
        mb={4}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          className="imageWrapper"
          src={image.url}
          alt={image.name}
          height="50rem"
          margin="auto"
        />
        <Text fontSize="5xl" mt={2}>
          {image.name}
        </Text>
        <Text fontSize="3xl" mt={2}>
          {image.size}
        </Text>
        <Text fontSize="3xl" mt={2} textAlign="center" m={10}>
          {image.description}
        </Text>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="15rem" mt="3rem">
        {image.details?.slice(0, 2).map((detail, index) => (
          <Box key={index}>
            <Image
              src={detail.subUrl}
              alt={`Detail ${index + 1}`}
              height="50rem"
              className="imageWrapper"
            />
          </Box>
        ))}
      </Grid>
      {image.details?.[2] ? (
        <Flex gap="15rem" flexDirection="row">
          <Image
            className="imageWrapper"
            src={image.details[2].subUrl}
            alt="Detail 3"
            height="50rem"
            width={image.details.length === 4 ? "38rem" : "100%"}
            mt="5rem"
          />
          {image.details?.[3] && (
            <Image
              className="imageWrapper"
              src={image.details[3].subUrl}
              alt="Detail 4"
              height="50rem"
              width="38rem"
              mt="5rem"
            />
          )}
        </Flex>
      ) : null}
      <Box mt="3rem">
        <Link to="/projects">
          <IconButton
            icon={<SlArrowLeft size="2.5rem" />}
            variant="ghost"
            boxSize="3em"
            mr="2rem"
          />
        </Link>
        <Link to="/contact">
          <Button fontSize="2xl" h="3rem" fontFamily="Poiret One">
            {t("BtnAskForPrice")}
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default Detail;
