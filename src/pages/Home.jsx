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
        flexDirection={["column", "row"]}
        justifyContent={["flex-start", "space-between"]}
        alignItems="center"
        w="100%"
        h={["auto", "50vh"]}
        overflow="hidden"
        boxShadow="dark-lg"
        textAlign="justify"
        gap={4}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: ["100%", "50%"],
            objectFit: "cover",
            maxHeight: ["50vh", "auto"]
          }}
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
        <Text fontSize={{base: "2xl", md: "3xl"}} flex="1" textAlign={{base: "left" , md: "justify"}} mr={5}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi reprehenderit quae voluptatum? Rem unde cupiditate excepturi dignissimos perferendis mollitia dolorum? Dicta vel optio atque deleniti ab ratione dolor perferendis fugiat sint, maxime aspernatur? A ipsum sint nisi ratione, cupiditate fugit animi, magnam cum voluptatem eos facere in tenetur vero. Culpa dolore expedita sed doloribus iusto suscipit quo praesentium rem, magnam ex dolores assumenda est tempora minima. Nobis quos repellat earum eaque placeat sunt doloremque sint, quas quis aliquam aperiam sit officia rerum mollitia cumque voluptatum tenetur eos, quibusdam vitae fugit dicta dolores maiores. Maiores vel magnam dolor velit voluptas?
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
