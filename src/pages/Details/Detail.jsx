import React from "react";
import {
  Image,
  Heading,
  Flex,
  Container,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import konst from "../../data/data";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const painting = konst.find((p) => p.id === id);

  if (!painting) {
    return <div>Painting not found</div>;
  }

  const { name, image } = painting;

  return (
    <Container>
    
          <Image
            src={image}
            borderRadius="lg"
            w="100%"
            h="50vh"
            objectFit="cover"
          />
          <Flex justifyContent="center" alignItems="center">
            <Heading size="lg">{name}</Heading>
          </Flex>
  
      <Link to="/contact">
        <Button colorScheme='red'>Ask for price</Button>
      </Link>
    </Container>
  );
}

export default Detail;
