import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import backgroundFoto from "../../assets/images/main-pic.jpg";
import PaintingCard from "../../components/paintingCard";
import konst from "../../data/data";
import { Link } from "react-router-dom";
import "./Home.css"
function Home() {
  return (
    <div className="mainDiv">
      <img src={backgroundFoto} alt="background" className="homeMainFoto" />
      <Container maxW="container.lg">
        <Flex flexWrap="wrap" justifyContent="space-around">
          {konst.map((painting) => (
            <Link to={`/detail/${painting.id}`} key={painting.id}>
              <PaintingCard
                name={painting.name}
                image={painting.image}
                id={painting.id} 
              />
            </Link>
          ))}
        </Flex>
      </Container>
    </div>
  );
}

export default Home;
