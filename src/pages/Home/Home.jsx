import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import backgroundFoto from "../../assets/images/main-pic.jpg";
import PaintingCard from "../../components/paintingCard";
import konst from "../../data/data";

function Home() {
  return (
    <div>
      <img src={backgroundFoto} alt="background" h="10rem" w="50%" />
      <Container maxW="container.lg">
        <Flex flexWrap="wrap" justifyContent="space-around">
          {konst.map((painting, index) => (
            <PaintingCard key={index} name={painting.name} image={painting.image} />
          ))}
        </Flex>
      </Container>
    </div>
  );
}

export default Home;
