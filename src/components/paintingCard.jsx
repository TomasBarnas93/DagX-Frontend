import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PaintingCard({ image, index }) {
  return (
    <Link to={`/detail/${index + 1}`}>
      <Flex
        flexDirection="row"
        alignItems="center"
        width="100%"
        textAlign="justify"
        mt={5}
      >
        <Link to={`/detail/${index + 1}`}>
          <Image
            src={image.url}
            alt={`Painting ${index + 1}`}
            key={index}
            objectFit="cover"
          />
        </Link>
        <Box ml={4} fontSize="2xl" fontWeight="bold">
          <Text>{image.name}</Text>
          <Text>{image.size}</Text>
          <Text>{image.avalible === "yes" ? "Dostępny" : "Sprzedany"}</Text>
        </Box>
      </Flex>
    </Link>
  );
}

export default PaintingCard;
