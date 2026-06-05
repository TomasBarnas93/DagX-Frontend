import React, { useContext, useEffect, useState } from "react";
import { ImageContext } from "../services/ImageContext";
import PaintingCardRightText from "../components/paintingCardRightText";
import PaintingCardLeftText from "../components/paintingCardLeftText";
import {
  Flex,
  Box,
  HStack,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

function Projects() {
  const { images, loading } = useContext(ImageContext);
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false, xl: false });

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearchActive(event.target.value.trim() !== "");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter images based on search
  const filteredImages = images.filter((image) =>
    (image.name || image.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Flex justify="center" align="center" minH="50vh">Loading paintings...</Flex>;
  }

  // Search mode
  if (isSearchActive) {
    return (
      <Flex direction="column">
        <Flex width="90%" justifyContent="center" mt="7rem" mb="2rem">
          <InputGroup maxWidth="md">
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search"
              fontFamily="Poiret One"
              onChange={handleSearchChange}
              focusBorderColor="transparent"
              sx={{ "&:focus": { boxShadow: "none", borderColor: "transparent" } }}
            />
          </InputGroup>
        </Flex>

        <Flex direction="column" alignItems="center">
          {filteredImages.map((image) => (
            <PaintingCardRightText
              key={image._id}
              image={image}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
          ))}
        </Flex>
      </Flex>
    );
  }

  // Mobile version
  if (isMobile) {
    return (
      <Flex direction="column">
        <Flex width="90%" justifyContent="center" mt="5rem" mb="3rem" ml="0.5rem">
          <InputGroup maxWidth="md">
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search"
              fontFamily="Poiret One"
              onChange={handleSearchChange}
              focusBorderColor="transparent"
              sx={{ "&:focus": { boxShadow: "none", borderColor: "transparent" } }}
            />
          </InputGroup>
        </Flex>

        <Flex direction="column" alignItems="center">
          {filteredImages.map((image) => (
            <PaintingCardRightText
              key={image._id}
              image={image}
              fontSizeName="1.5rem"
              fontSizeSize="1rem"
              fontSizeAvailable="1rem"
            />
          ))}
        </Flex>
      </Flex>
    );
  }

  // Desktop version - Alternating Left & Right cards
  return (
    <Flex direction="column" alignItems="center">
      <Flex width="100%" justifyContent="center" mt="7rem" mb="-5rem">
        <InputGroup maxWidth="md">
          <InputLeftElement pointerEvents="none">
            <IoIosSearch color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search"
            fontFamily="Poiret One"
            onChange={handleSearchChange}
            focusBorderColor="transparent"
            sx={{ "&:focus": { boxShadow: "none", borderColor: "transparent" } }}
          />
        </InputGroup>
      </Flex>

      {filteredImages.map((image, index) => (
        <React.Fragment key={image._id}>
          {index % 2 === 0 ? (
            <PaintingCardRightText
              image={image}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
          ) : (
            <PaintingCardLeftText
              image={image}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
}

export default Projects;