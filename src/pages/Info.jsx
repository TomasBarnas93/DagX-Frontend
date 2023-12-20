import React from "react";
import {
  List,
  Flex,
  Box,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Info = () => {
  const { t } = useTranslation();

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
      textAlign={{ base: "left", md: "justify" }}
      fontFamily="Poiret One"
    >
      <Box width="80%">
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
              marginBottom={{ base: "0.5rem", md: "2rem" }}
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: t("Punkt1Head") }}
            >
            </Text>
            <Flex
              as="li"
              alignItems="center"
              fontSize={fontSize}
              marginBottom="3rem"
            >
              <Box dangerouslySetInnerHTML={{ __html: t("Punkt1") }}></Box>
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
              marginBottom={{ base: "0.5rem", md: "2rem" }}
            >
              {t("Punkt2Head")}
            </Text>
            <Flex
              as="li"
              alignItems="center"
              fontSize={fontSize}
              marginBottom="3rem"
            >
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
              marginBottom={{ base: "0.5rem", md: "2rem" }}
            >
              {t("Punkt3Head")}
            </Text>
            <Flex
              as="li"
              alignItems="center"
              fontSize={fontSize}
              marginBottom={{ base: "2rem", md: "3rem" }}
            >
              <Box dangerouslySetInnerHTML={{ __html: t("Punkt3") }}></Box>
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
              marginBottom={{ base: "0.5rem", md: "2rem" }}
            >
              {t("Punkt4Head")}
            </Text>
            <Flex as="li" alignItems="center" fontSize={fontSize}>
              <Box> {t("Punkt4")}</Box>
            </Flex>
          </Flex>
        </List>
      </Box>
    </Flex>
  );
};

export default Info;
