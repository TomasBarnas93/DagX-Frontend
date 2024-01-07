import React, { useContext, useEffect, useState } from "react";
import { ImageContext } from "../services/ImageContext";
import PaintingCardRightText from "../components/paintingCardRightText";
import {
  Flex,
  Box,
  HStack,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import PaintingCardLeftText from "../components/paintingCardLeftText";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function Projects() {
  const images = useContext(ImageContext);
  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
    xl: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [availableFilter, setAvailableFilter] = useState(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const { t } = useTranslation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearchActive(event.target.value.trim() !== "");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const applyFilters = (image) => {
    return (
      (availableFilter === null || availableFilter === "" || image.avalible === availableFilter) &&
      image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredImages = images.filter(applyFilters);

  const separateImages = (orientation, sourceArray) => {
    return sourceArray.reduce((acc, image) => {
      if (image.orientation === orientation) {
        acc.push(image);
      }
      return acc;
    }, []);
  };

  // Separate the images into small, big and all categories
  const smallImages = separateImages("horizontal", filteredImages);
  const bigImages = separateImages("vertical", filteredImages);

  // Split each category into left and right arrays
  const leftSmallImages = smallImages.slice(0, smallImages.length / 2);
  const rightSmallImages = smallImages.slice(smallImages.length / 2);
  const leftBigImages = bigImages.slice(0, bigImages.length / 2);
  const rightBigImages = bigImages.slice(bigImages.length / 2);

  if (isSearchActive) {
    return (
      <Flex direction="column">
        <Flex
          width="90%"
          justifyContent="center"
          mt="7rem"
          mb="-5rem"
          direction="row"
        >
          <InputGroup maxWidth="md">
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search"
              fontFamily="Poiret One"
              onChange={handleSearchChange}
              focusBorderColor="transparent"
              sx={{ '&:focus': { boxShadow: 'none', borderColor: 'transparent' } }}
            />
          </InputGroup>
          <Box marginLeft="2rem">
          <Button onClick={() => setShowFilterOptions(!showFilterOptions)} variant="ghost">
            <IoFilterOutline size="2rem" />
          </Button>
            {showFilterOptions && (
              <Box>
               <Select
                  placeholder= {t("Available")}
                  onChange={(e) => setAvailableFilter(e.target.value)}
                >
                  <option value="yes">{t("Yes")}</option>
                  <option value="no">{t("No")}</option>
                  <option value="">{t("Reset")}</option>
                </Select>
              </Box>
            )}
          </Box>
        </Flex>
        <Flex direction="column" alignItems="center">
          {filteredImages.map((image, index) => (
            <PaintingCardRightText
              key={index}
              image={image}
              index={index}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
          ))}
        </Flex>
      </Flex>
    );
  }

  if (isMobile) {
    return (
      <Flex direction="column">
        <Flex
          width="90%"
          justifyContent="center"
          mt="5rem"
          mb="3rem"
          ml="0.5rem"
          direction="row"
        >
          <InputGroup maxWidth="md">
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search"
              fontFamily="Poiret One"
              onChange={handleSearchChange}
              focusBorderColor="transparent"
              sx={{ '&:focus': { boxShadow: 'none', borderColor: 'transparent' } }}
            />
          </InputGroup>
          <Box marginLeft="2rem">
          <Button onClick={() => setShowFilterOptions(!showFilterOptions)} variant="ghost">
            <IoFilterOutline size="2rem" />
          </Button>
            {showFilterOptions && (
              <Box>
                <Select
                  placeholder= {t("Available")}
                  onChange={(e) => setAvailableFilter(e.target.value)}
                >
                  <option value="yes">{t("Yes")}</option>
                  <option value="no">{t("No")}</option>
                  <option value="">{t("Reset")}</option>
                </Select>
              </Box>
            )}
          </Box>
        </Flex>
        <Flex direction="column" alignItems="center">
          {filteredImages.map((image, index) => (
            <PaintingCardRightText
              key={index}
              image={image}
              index={index}
              fontSizeName={"1.5rem"}
              fontSizeSize={"1rem"}
              fontSizeAvailable={"1rem"}
            />
          ))}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" alignItems="center">
      <Flex
        width="100%"
        justifyContent="center"
        mt="7rem"
        mb="-5rem"
        direction="row"
      >
        <InputGroup maxWidth="md">
          <InputLeftElement pointerEvents="none">
            <IoIosSearch color="gray.300" />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search"
            fontFamily="Poiret One"
            onChange={handleSearchChange}
            focusBorderColor="transparent"
            sx={{ '&:focus': { boxShadow: 'none', borderColor: 'transparent' } }}
          />
        </InputGroup>
        <Box marginLeft="2rem">
        <Button onClick={() => setShowFilterOptions(!showFilterOptions)} variant="ghost">
            <IoFilterOutline size="2rem" />
          </Button>
          {showFilterOptions && (
            <Box>
              <Select
                  placeholder= {t("Available")}
                  onChange={(e) => setAvailableFilter(e.target.value)}
                >
                  <option value="yes">{t("Yes")}</option>
                  <option value="no">{t("No")}</option>
                  <option value="">{t("Reset")}</option>
                </Select>
            </Box>
          )}
        </Box>
      </Flex>
      {/* Render small images */}
      {leftSmallImages.map((leftImage, index) => {
        const rightImage = rightSmallImages[index];
        return (
          <HStack key={index} spacing={4} width="100%">
            <PaintingCardRightText
              image={leftImage}
              index={index}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
            <Box
              borderLeft="1px solid black"
              height="200px"
              marginTop="12rem"
            />
            {rightImage && (
              <PaintingCardLeftText
                image={rightImage}
                index={index + leftSmallImages.length}
                fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
                fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
                fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
              />
            )}
          </HStack>
        );
      })}
      {/* Render big images */}
      {leftBigImages.map((leftImage, index) => {
        const rightImage = rightBigImages[index];
        return (
          <HStack key={index} spacing={4} width="100%">
            <PaintingCardRightText
              image={leftImage}
              index={index}
              fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
              fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
              fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
            />
            <Box
              borderLeft="1px solid black"
              height="200px"
              marginTop="12rem"
            />
            {rightImage && (
              <PaintingCardLeftText
                image={rightImage}
                index={index + leftBigImages.length}
                fontSizeName={{ base: "2.5rem", md: "3xl", xl: "5xl" }}
                fontSizeSize={{ base: "1.2rem", md: "md", xl: "2xl" }}
                fontSizeAvailable={{ base: "1.2rem", md: "lg", xl: "2xl" }}
              />
            )}
          </HStack>
        );
      })}
    </Flex>
  );
}

export default Projects;
