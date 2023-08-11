import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Container,
  Textarea,
} from "@chakra-ui/react";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';
import { useTranslation } from "react-i18next";

function Contact() {
  const [recipientName, setRecipientName] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const SERVICE_ID = "service_nrj1kkw";
    const TEMPLATE_ID = "template_uwd8mki"; 
    const USER_ID = "hM2zYKNrjou6hmE5B"; 

    const formData = {
      from_name: e.target.elements.from_name.value,
      to_name: recipientName,
      message: e.target.elements.message.value,
      user_email: e.target.elements.user_email.value
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
      .then((response) => {
        console.log("Email sent successfully:", response);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully',
        });
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong',
          text: error.text,
        });
      });
  };

  const handleRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };
 return (
    <Container>
      <FormControl as="form" onSubmit={handleSubmit}>
        <Flex direction="column">
          <FormLabel marginTop={2}>{t('first_name')}</FormLabel>
          <Input name="from_name" w="50%" />
        </Flex>
        <Flex direction="column">
          <FormLabel marginTop={2}>{t('last_name')}</FormLabel>
          <Input name="to_name" w="50%" onChange={handleRecipientNameChange} />
        </Flex>
        <Flex direction="column">
          <FormLabel marginTop={2}>{t('email_address')}</FormLabel>
          <Input name="user_email" type="email" w="50%" />
        </Flex>
        <Flex direction="column">
          <FormLabel marginTop={2}>{t('message')}</FormLabel>
          <Textarea name="message" w="50%" />
        </Flex>
        <Button colorScheme="yellow" marginTop={2} type="submit">
          {t('send')}
        </Button>
      </FormControl>
    </Container>
  );
}

export default Contact;