import React from "react";
import { Box, Heading, Image } from "@chakra-ui/react";

function PaintingCard({ name, image }) {
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      h="50%"
    >
      <Image src={image} alt={name} />
      <Box p="4">
        <Heading as="h3" size="md" fontFamily="Poppins">
          {name}
        </Heading>
      </Box>
    </Box>
  );
}

export default PaintingCard;
