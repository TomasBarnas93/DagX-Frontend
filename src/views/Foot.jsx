import React from "react";
import { Icon, Link, Container, Box, Flex } from "@chakra-ui/react";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

function Foot() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <>
      <Container marginTop={5} textAlign="center">
        <Box>
          <Flex justify="center" gap={5}>
            <Link href="https://www.facebook.com/DAGX.art">
              <Icon as={MdFacebook} boxSize={6} />
            </Link>
            <Link href="https://www.instagram.com/dagx.art/">
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
          </Flex>
        </Box>
      </Container>
      <footer>&copy; {year} DagX | All rights reserved.</footer>
    </>
  );
}

export default Foot;
