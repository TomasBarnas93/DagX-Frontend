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
import emailjs from "emailjs-com";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    size: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const SERVICE_ID = "service_e4mho9e";
    const TEMPLATE_ID = "template_4afzj1p";
    const USER_ID = "6V6OSOnmKkTAASAp1";

    const templateParams = {
      from_name: formData.name,
      message: formData.message,
      user_email: formData.email,
      user_telefon: formData.phone,
      size: formData.size, 
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((response) => {
        console.log("Email sent successfully:", response);
        Swal.fire({
          icon: "success",
          title: t("Success"),
        });
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
          size: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        Swal.fire({
          icon: "error",
          title: t("Wrong"),
          text: error.text || "Something went wrong",
        });
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="85vh"
      py={10}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        rounded="md"
        width={{ base: "90%", md: "80%", lg: "70%" }}
        backgroundColor="#f3eee7"
        fontFamily="Poiret One"
        className="imageWrapper"
        p={8}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing={6} alignItems="stretch" width="100%">
            <FormControl isRequired>
              <FormLabel fontSize="2xl">{t("Name")}</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                border="1px solid darkgrey"
                placeholder="Your name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="2xl">{t("Email")}</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                border="1px solid darkgrey"
                placeholder="your@email.com"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="2xl">{t("Phone")}</FormLabel>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                border="1px solid darkgrey"
                placeholder="+46 123 456 789"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="2xl">{t("Message")}</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                border="1px solid darkgrey"
                rows={6}
                placeholder="Write your message here..."
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="2xl">{t("Size")}</FormLabel>
              <Input
                name="size"
                value={formData.size}
                onChange={handleChange}
                border="1px solid darkgrey"
                placeholder="e.g. 50x70 cm"
              />
            </FormControl>

            <Button
              type="submit"
              backgroundColor="#DDDCDB"
              size="lg"
              fontSize="xl"
              fontWeight="normal"
              fontFamily="Poiret One"
              mt={4}
              _hover={{ backgroundColor: "#c9c8c3" }}
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