import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function PaintingCardRightText({ image, index }) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <motion.div
    initial={{ opacity: 0, y: 100 }}  
    whileInView={{ 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        duration: 1.5 
      } 
    }}
    viewport={{ once: true }}
  >
      <Link to={`/detail/${index + 1}`}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          textAlign="justify"
          marginTop="10rem"
          justifyContent="space-between"
          marginLeft={{ md: "5rem" }}
        >
          <Link to={`/detail/${index + 1}`}>
            <Box className="imageWrapper">
              <Image
                src={image.url}
                alt={`Painting ${index + 1}`}
                key={index}
                objectFit="cover"
                width={{ base: "50rem", md: "90rem" }}
                margin="auto"
              />
            </Box>
          </Link>
          <Box
            marginTop={{ base: "2rem" }}
            ml={4}
            fontWeight="bold"
            marginRight={ location.pathname === "/projects" ? "5rem" : "10rem"}
            fontFamily="Poiret One"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            marginLeft={{ base: location.pathname === "/projects" ? "5rem" :"11rem", md: location.pathname === "/projects" ? "5rem" : "5rem" }}
          >
            <Text fontSize={{ base: "2.5rem", md: "5xl" }}>{image.name}</Text>
            <Text fontSize={{ base: "1.2rem", md: "2xl" }}>{image.size}</Text>
            <Box
              className="underlineCustom"
              marginTop={{ base: "1.5rem", md: "2rem" }}
            ></Box>
            <Text
              fontSize={{ base: "1.2rem", md: "2xl" }}
              mt={{ base: 5, md: 10 }}
            >
              {image.avalible === "yes" ? t("Available") : t("Sold")}
            </Text>
          </Box>
        </Flex>
      </Link>
    </motion.div>
  );
}

export default PaintingCardRightText;
