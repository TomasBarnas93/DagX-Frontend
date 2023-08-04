import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import backgroundFoto from "../../assets/images/main-pic.jpg";
import PaintingCard from "../../components/paintingCard";
import konst from "../../data/data";
import "./Home.css"

function Home() {
  return (
    <div>
      <img src={backgroundFoto} alt="background" className="homeMainFoto"/>
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
