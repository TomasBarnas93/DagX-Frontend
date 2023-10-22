import React from "react";
import { Container, Flex, Box, Link as ChakraLink, Text } from "@chakra-ui/react";
import homeVideo from "../assets/videos/HomeVideo.mp4";
import PaintingCard from "../components/paintingCard";
import konst from "../data/data";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box>
      <Flex
        flexDirection="column"  
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        overflow="hidden"
        textAlign="justify"
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: "80vh",
            filter: "grayscale(100%) contrast(170%) brightness(90%)",
            opacity: 0.4,  
          }}
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
        <Text
          fontSize={{base: "2xl", md: "3xl"}}
          flex={1}
          textAlign={{base: "left" , md: "justify"}}
          marginLeft={{base: 3, md: 0}}
          marginRight={{base: 3, md: 0}}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est deleniti ea labore...
        </Text>
      </Flex>

      <Container maxW="container.lg">
        <Flex flexWrap="wrap" justifyContent="space-around">
          {konst.map((painting) => (
            <ChakraLink as={Link} to={`/detail/${painting.id}`} key={painting.id}>
              <PaintingCard
                name={painting.name}
                image={painting.image}
                id={painting.id}
              />
            </ChakraLink>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
export default Home;
