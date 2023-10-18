import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import homeVideo from "../../assets/videos/HomeVideo.mp4";
import PaintingCard from "../../components/paintingCard";
import konst from "../../data/data";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="mainDiv">
      <div className="homeDivVideo">
      <video autoPlay loop muted className="homeMainVideo">
        <source src={homeVideo} type="video/mp4" />
      </video>
      </div>
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
