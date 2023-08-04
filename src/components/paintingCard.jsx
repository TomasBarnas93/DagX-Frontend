import React from "react";
import { Image, Card, CardBody, Heading, Flex } from '@chakra-ui/react'

function PaintingCard({ name, image }) {
  return (
    <Card marginTop={5} maxW="md">
      <CardBody>
        <Image src={image} borderRadius='lg' w="50vh" h="50vh" objectFit="cover" />
        <Flex justifyContent="center" alignItems="center">
          <Heading size="lg">{name}</Heading>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default PaintingCard;
