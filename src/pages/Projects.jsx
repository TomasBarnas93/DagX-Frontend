import { Container, Text, Flex, Box, Image } from "@chakra-ui/react";
import React from "react";
import image from "../assets/images/about-face.jpg";

function Projects() {
  return (
    <Container maxW="container.lg">
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Box width={{ base: "100%", md: "50%" }}>
          <Text fontSize='2xl'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            dolores cupiditate veniam quis quaerat cumque, illum dolorum. Nulla
            architecto sed soluta sequi consequuntur, illo nostrum alias error
            doloribus eum distinctio deserunt eaque adipisci explicabo illum
            dicta! Blanditiis, esse molestiae. Explicabo, accusantium
            consequuntur sit animi numquam sunt, laboriosam voluptatum in quas
            voluptates asperiores ex! Doloribus porro architecto reprehenderit
            optio harum ab, voluptates facilis, deleniti nesciunt, numquam nam.
            Vel ex est unde in rem sed voluptates aliquid! Sunt sed eligendi ad
            delectus laborum fuga asperiores iusto excepturi, accusantium
            corrupti accusamus dolores non adipisci fugit eaque? Praesentium
            ullam tempore corporis tempora sed deleniti.
          </Text>
        </Box>
        <Box width={{ base: "100%", md: "50%" }}>
          <Image src={image} w="100%" />
        </Box>
      </Flex>
    </Container>
  );
}

export default Projects;
