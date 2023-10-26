import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PaintingCard({ image, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: index * 1 }}
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
            <Box className="imageWrapper" >
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
            marginRight={{ md: "10rem" }}
            fontFamily="Poiret One"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontSize={{ base: "2.5rem", md: "5xl" }}>{image.name}</Text>
            <Text fontSize={{ base: "1.5rem", md: "2xl" }}>{image.size}</Text>
            <Box
              className="underlineCustom"
              marginTop={{ base: "1.5rem", md: "2rem" }}
            ></Box>
            <Text
              fontSize={{ base: "1.2rem", md: "2xl" }}
              mt={{ base: 5, md: 10 }}
            >
              {image.avalible === "yes" ? "Dostępny" : "SPRZEDANY"}
            </Text>
          </Box>
        </Flex>
      </Link>
    </motion.div>
  );
}

export default PaintingCard;
