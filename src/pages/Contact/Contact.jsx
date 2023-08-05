import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Container,
} from "@chakra-ui/react";

function Contact() {
  return (
    <Container>
      <FormControl>
        <Flex direction="column">
          <FormLabel marginTop={2}>First name</FormLabel>
          <Input w="50%" />
        </Flex>
        <Flex direction="column">
          <FormLabel marginTop={2}>Last name</FormLabel>
          <Input w="50%" />
        </Flex>
        <Flex direction="column">
          <FormLabel marginTop={2}>Email address</FormLabel>
          <Input type="email" w="50%" />
        </Flex>
        <Button colorScheme='yellow' marginTop={2}>Send</Button>
      </FormControl>
    </Container>
  );
}

export default Contact;
