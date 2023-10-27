import React from "react";
import { Image, Link as ChakraLink, Container, Box, Flex } from "@chakra-ui/react";
import emailImg from '../assets/images/emailImg.PNG';
import facebookImg from '../assets/images/facebookImg.PNG';
import instagramImg from '../assets/images/instagramImg.PNG';
import { Link } from "react-router-dom";

function Foot() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <>
      <Container marginTop={5} textAlign="center">
        <Box>
          <Flex justify="center" gap={5}>
            <ChakraLink href="https://www.facebook.com/DAGX.art" isExternal>
              <Image src={facebookImg} />
            </ChakraLink>
            <ChakraLink href="https://www.instagram.com/dagx.art/" isExternal>
              <Image src={instagramImg} />
            </ChakraLink>
            <ChakraLink as={Link} to="/contact"><Image src={emailImg}/></ChakraLink>
          </Flex>
        </Box>
      </Container>
      <footer>&copy; {year} DagX | ALL RIGHTS RESERVED</footer>
    </>
  );
}

export default Foot;
