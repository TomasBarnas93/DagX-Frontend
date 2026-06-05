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
  Text,
  Heading,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaInstagram } from "react-icons/fa";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      .then(() => {
        Swal.fire({
          icon: "success",
          title: t("Success"),
        });
        setFormData({ name: "", email: "", message: "", phone: "", size: "" });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: t("Wrong"),
          text: error.text || "Something went wrong",
        });
      });
  };

  return (
    <Box py={12} px={5} bg="#F0E7D8" minH="100vh">
      <Flex
        direction={{ base: "column", lg: "row" }}
        maxW="1200px"
        mx="auto"
        gap={12}
        align="start"
      >
        <Box flex="1" minW={{ base: "100%", lg: "380px" }}>
          <Heading fontFamily="Poiret One" size="xl" mb={8} color="#2C2C2C">
            {t("ContactInformation") || "Kontaktinformation"}
          </Heading>

          <VStack align="stretch" spacing={8} fontSize="lg">
            <HStack>
              <PhoneIcon color="gray.700" boxSize={6} />
              <Box>
                <Text fontWeight="bold">Telefon:</Text>
                <Text>+46 123 456 789</Text>
              </Box>
            </HStack>

            <HStack>
              <EmailIcon color="gray.700" boxSize={6} />
              <Box>
                <Text fontWeight="bold">E-post:</Text>
                <ChakraLink href="mailto:info@dagx.art" color="blue.700" fontWeight="medium">
                  info@dagx.art
                </ChakraLink>
              </Box>
            </HStack>

            <Box>
              <Text fontWeight="bold" mb={2}>Adress:</Text>
              <Text>Hässelby, Stockholm</Text>
            </Box>
          </VStack>

          <Box mt={12}>
            <Text fontWeight="bold" mb={4} fontSize="lg">Följ oss</Text>
            <HStack spacing={8}>
              <ChakraLink href="https://www.facebook.com/DAGX.art" isExternal color="gray.700" _hover={{ color: "blue.600" }}>
                <FaFacebook size="32px" />
              </ChakraLink>
              <ChakraLink href="https://www.instagram.com/dagx.art/" isExternal color="gray.700" _hover={{ color: "#E1306C" }}>
                <FaInstagram size="32px" />
              </ChakraLink>
            </HStack>
          </Box>
        </Box>

        <Box flex="1.2">
          <Box
            bg="white"
            p={{ base: 8, md: 12 }}
            borderRadius="2xl"
            boxShadow="xl"
            border="1px solid #E2D9C8"
            _hover={{ boxShadow: "2xl" }}
            transition="all 0.3s ease"
          >
            <Heading fontFamily="Poiret One" size="xl" mb={10} textAlign="center" color="#2C2C2C">
              {t("SendMessage") || "Skicka meddelande"}
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={8} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontSize="xl" fontWeight="medium">{t("Name")}</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=""
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="xl" fontWeight="medium">{t("Email")}</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="xl" fontWeight="medium">{t("Phone")}</FormLabel>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="xl" fontWeight="medium">{t("Message")}</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("MessageHolder")}
                    size="lg"
                    rows={7}
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="xl" fontWeight="medium">{t("Size")}</FormLabel>
                  <Input
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="50x70 cm"
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  height="60px"
                  fontSize="2xl"
                  fontFamily="Poiret One"
                  bg="#DDDCDB"
                  color="#2C2C2C"
                  _hover={{ bg: "#C9C8C3", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  mt={4}
                >
                  {t("Send")}
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Contact;