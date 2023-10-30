import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    size: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("message", formData.message);
    formDataObj.append("size", formData.size);
    formDataObj.append("attachment", formData.attachment);

    try {
      const response = await fetch("http://localhost:3000/contact_form", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log("Email sent successfully:", result);
      const sucessMessage = t("Success");
      Swal.fire({
        icon: "success",
        title: sucessMessage,
      });
      setFormData({
        name: "",
        email: "",
        message: "",
        size: "",
        attachment: null,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      const wrongMessage = t("Wrong");
      Swal.fire({
        icon: "error",
        title: wrongMessage,
        text: error.message,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="85vh"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        rounded="md"
        width="50rem"
        height="50rem"
        backgroundColor="#f3eee7"
        fontFamily="Poiret One"
        className="imageWrapper"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel ml={{ base: "1rem", md: "0" }} fontSize="3xl">{t("Name")}</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                border="1px solid darkgrey"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel ml={{ base: "1rem", md: "0" }} fontSize="3xl">{t("Email")}</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                border="1px solid darkgrey"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel ml={{ base: "1rem", md: "0" }} fontSize="3xl">{t("Message")}</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                border="1px solid darkgrey"
              />
            </FormControl>
            <FormControl>
              <FormLabel ml={{ base: "1rem", md: "0" }} fontSize="3xl">{t("Size")}</FormLabel>
              <Input
                name="size"
                value={formData.size}
                onChange={handleChange}
                border="1px solid darkgrey"
              />
            </FormControl>
            <FormControl>
              <FormLabel ml={{ base: "1rem", md: "0" }} fontSize="3xl">{t("Attachment")}</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
            <Button
              fontFamily="Poiret One"
              type="submit"
              backgroundColor="#DDDCDB"
              size="lg"
              fontSize="2xl"
              fontWeight="normal"
            >
              {t("Send")}
            </Button>
          </VStack>
        </form>
      </Flex>
    </Box>
  );
}

export default Contact;
