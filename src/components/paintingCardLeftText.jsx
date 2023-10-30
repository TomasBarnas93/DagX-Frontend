import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function PaintingCardLeftText({ image, fontSizeName, fontSizeAvailable, fontSizeSize }) {
  const { t } = useTranslation();

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
      <Link to={`/detail/${image.originalIndex + 1}`}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          textAlign="justify"
          marginTop="10rem"
          justifyContent="space-between"
          marginRight={{ md: "5rem" }}
        >
              <Box
            marginTop={{ base: "2rem" }}
            ml={4}
            fontWeight="bold"
            marginRight={{ md: "5rem" }}
            fontFamily="Poiret One"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            marginLeft="5rem"
          >
            <Text fontSize={fontSizeName}>{image.name}</Text>
            <Text fontSize={fontSizeSize}>{image.size}</Text>
            <Box
              className="underlineCustom"
              marginTop={{ base: "1.5rem", md: "2rem" }}
            ></Box>
            <Text
              fontSize={fontSizeAvailable}
              mt={{ base: 5, md: 10 }}
            >
              {image.avalible === "yes" ? t("Available") : t("Sold")}
            </Text>
          </Box>
          <Link to={`/detail/${image.originalIndex + 1}`}>
            <Box className="imageWrapper">
              <Image
                src={image.url}
                alt={`Painting`}
                objectFit="cover"
                width={{ base: "50rem", md: "90rem" }}
                margin="auto"
              />
            </Box>
          </Link>
        </Flex>
      </Link>
    </motion.div>
  );
}

export default PaintingCardLeftText;
