import React from "react";
import { Image, Card, CardBody, Heading, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PaintingCard({ name, image, id }) {
  return (
    <Link to={`/detail/${id}`}>
      <Card marginTop={5} maxW="md">
        <CardBody>
          <Image
            src={image}
            borderRadius="lg"
            w="50vh"
            h="50vh"
            objectFit="cover"
          />
          <Flex justifyContent="center" alignItems="center">
            <Heading size="lg">{name}</Heading>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
}

export default PaintingCard;
