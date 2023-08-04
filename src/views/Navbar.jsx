import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Box, Flex, Spacer, Text, Link as ChakraLink } from '@chakra-ui/react';
import logopic from '../assets/images/logo.jpg';
import { GB, PL, SE } from 'country-flag-icons/react/3x2';

const Navbar = () => {
  return (
    <Flex bg="#f5f5dc" p={2} alignItems="center">
      <Box ml="1rem">
        <ChakraLink as={Link} to="/">
        <Image src={logopic} alt="logo" w="4rem" h="auto" borderRadius="50%"/>
        </ChakraLink>
      </Box>
      <Box ml="3rem">
        <ChakraLink as={Link} to="/" color="black" fontSize="md">
          <Text fontFamily="Poppins">Home</Text>
        </ChakraLink>
      </Box>
      <Box p="2">
        <ChakraLink as={Link} to="/contact" color="black" fontSize="md">
          <Text fontFamily="Poppins">Contact</Text>
        </ChakraLink>
      </Box>
      <Box p="1">
        <ChakraLink as={Link} to="/about" color="black" fontSize="md">
          <Text fontFamily="Poppins">About</Text>
        </ChakraLink>
      </Box>
      <Spacer />
      <Box mr="4rem">
        <ChakraLink as={Link} to="/create" color="black" fontSize="md">
          <Text fontFamily="Poppins">Create</Text>
        </ChakraLink>
      </Box>
      <Box mr="1rem">
        <GB title="Great Britain" className="flag-icon" />
      </Box>
      <Box mr="1rem">
        <PL title="Poland" className="flag-icon" />
      </Box>
      <Box mr="1rem">
        <SE title="Sweden" className="flag-icon"/>
      </Box>
    </Flex>
  );
};

export default Navbar;
