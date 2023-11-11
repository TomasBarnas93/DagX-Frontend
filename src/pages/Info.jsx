import React from "react";
import {
  List,
  Flex,
  Box,
  Image,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import listPunkt from "../assets/images/listPunkt2.png";

const Info = () => {
  const { t } = useTranslation();

  const CustomListIcon = ({ src }) => (
    <Image
      src={src}
      alt="List Icon"
      boxSize={{ base: "8rem", md: "9rem", lg: "10rem", xl: "10rem" }}
      marginRight={{ base: "-2rem", md: "none" }}
      marginLeft={{ base: "-2rem", md: "none" }}
    />
  );

  const fontSize = useBreakpointValue({
    base: "xl",
    md: "2xl",
    lg: "2xl",
    xl: "3xl",
  });

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      textAlign="left"
      fontFamily="Poiret One"
      width="90%"
    >
      <Box>
        <List styleType="none" paddingRight={{ base: "2rem", md: "0" }}>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "2xl", lg: "3xl", xl: "3xl" }}
              marginBottom={{base: "0.5rem", md: "2rem"}}
            >
              {t("Punkt1Head")}
            </Text>
            <Flex
              as="li"
              alignItems="center"
              fontSize={fontSize}
              marginBottom="3rem"
            >
              <CustomListIcon src={listPunkt} />
              <Box>{t("Punkt1")}</Box>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "2xl", lg: "3xl", xl: "3xl" }}
              marginBottom={{base: "0.5rem", md: "2rem"}}
            >
              {t("Punkt2Head")}
            </Text>
            <Flex
              as="li"
              alignItems="center"
              fontSize={fontSize}
              marginBottom="3rem"
            >
              <CustomListIcon src={listPunkt} />
              <Box>{t("Punkt2")}</Box>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "2xl", lg: "3xl", xl: "3xl" }}
              marginBottom={{base: "0.5rem", md: "2rem"}}
            >
              {t("Punkt3Head")}
            </Text>
            <Flex
              as="li"
              alignItems="center"
              fontSize={fontSize}
              marginBottom={{ base: "2rem", md: "3rem" }}
            >
              <CustomListIcon src={listPunkt} />
              <Box>{t("Punkt3")}</Box>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "2xl", lg: "3xl", xl: "3xl" }}
              marginBottom={{base: "0.5rem", md: "2rem"}}
            >
              {t("Punkt4Head")}
            </Text>
            <Flex as="li" alignItems="center" fontSize={fontSize}>
              <CustomListIcon src={listPunkt} />
              <Box> {t("Punkt4")}</Box>
            </Flex>
          </Flex>
        </List>
      </Box>
    </Flex>
  );
};

export default Info;
