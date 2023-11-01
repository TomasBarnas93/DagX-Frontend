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
    <Flex
  flexDirection={["column", "row"]}  
  width={["100%", "85%"]}  
  justifyContent="space-around"
  mt="3rem"
>
  {image.details?.[0] && (
    <Image
      src={image.details[0].subUrl}
      alt="Detail 1"
      height={["40rem", "50rem"]}  
      className="imageWrapper"
    />
  )}
  {image.details?.[0] && image.details?.[1] && (
    <Box
      width={["0", "2px"]} 
      backgroundColor="black"
      height="30rem"
      alignSelf="center"
      mx="7.5rem"
      display={["none", "block"]}  
    />
  )}
  {image.details?.[1] && (
    <Image
      src={image.details[1].subUrl}
      alt="Detail 2"
      height={["40rem", "50rem"]} 
      className="imageWrapper"
    />
  )}
</Flex>
{image.details?.[2] ? (
  <Flex 
    gap={["0", "7rem"]}  
    flexDirection={["column", "row"]}
  >
    <Image
      className="imageWrapper"
      src={image.details[2].subUrl}
      alt="Detail 3"
      height={["40rem", "50rem"]}
      width={image.details.length === 4 ? "38rem" : "100%"}
      mt="5rem"
    />
    {image.details?.[3] ? (
      <>
        <Box
          width={["0", "2px"]}
          backgroundColor="black"
          height="30rem"
          alignSelf="center"
          mx="7.5rem"
          marginTop="9rem"
          display={["none", "block"]} 
        />
        <Image
          className="imageWrapper"
          src={image.details[3].subUrl}
          alt="Detail 4"
          height={["40rem", "50rem"]}
          width="38rem"
          mt="5rem"
        />
      </>
    ) : null}
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
      </Box>
    </Flex>
  );
}

export default Detail;