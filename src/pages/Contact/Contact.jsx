import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

function Contact() {
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
      Swal.fire({
        icon: "success",
        title: "Success",
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
      Swal.fire({
        icon: "error",
        title: "Wrong",
        text: error.message,
      });
    }
  };

  return (
    <Container mt={5} p={5} boxShadow="dark-lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Size</FormLabel>
            <Input
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Size"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Attachment</FormLabel>
            <Input type="file" onChange={handleFileChange} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default Contact;
