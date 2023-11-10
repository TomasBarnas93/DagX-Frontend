import React from "react";
import { List, Flex, Box, Image, useBreakpointValue } from "@chakra-ui/react";
import infoImg from "../assets/images/InfoImg.jpg";
import listPunkt1 from "../assets/images/listPunkt1.png";
import { useTranslation } from "react-i18next";
import listPunkt2 from "../assets/images/listPunkt2.png";

const Info = () => {
  const {t} = useTranslation();

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
      alignItems="flex-start"
      textAlign="left"
      fontFamily="Poiret One"
      fontWeight="bold"
    >
      <Box>
        <List styleType="none" paddingRight={{ base: "2rem", md: "0" }}>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom="2rem"
          >
            <CustomListIcon src={listPunkt2} />
            <Box>
              {t("Punkt1")}
            </Box>
          </Flex>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom="2rem"
          >
            <CustomListIcon src={listPunkt2} />
            <Box>
            {t("Punkt2")}
            </Box>
          </Flex>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom={{base: "-0.5rem",md: "-2rem"}}
          >
            <CustomListIcon src={listPunkt1} />
            <Box>
            {t("Punkt3")}
            </Box>
          </Flex>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom={{base: "-1.5rem",md: "-3rem"}}
          >
            <CustomListIcon src={listPunkt1} />
            <Box> {t("Punkt4")}</Box>
          </Flex>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom={{base: "none",md: "-1rem"}}
          >
            <CustomListIcon src={listPunkt1} />
            <Box>
            {t("Punkt5")}
            </Box>
          </Flex>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom={{base: "none",md: "-3rem"}}
          >
            <CustomListIcon src={listPunkt1} />
            <Box>
            {t("Punkt6")}
            </Box>
          </Flex>
          <Flex
            as="li"
            alignItems="center"
            fontSize={fontSize}
            marginBottom="1rem"
          >
            <CustomListIcon src={listPunkt1} />
            <Box>
            {t("Punkt7")}
            </Box>
          </Flex>
        </List>
      </Box>
      <Box
        display={{ base: "none", md: "none", lg: "none", xl: "block" }}
        marginLeft={{ md: "1rem", lg: "2rem" }}
      >
        <Image
          src={infoImg}
          alt="Image"
          objectFit="cover"
          width={{ md: "100rem", lg: "100rem", xl: "200rem" }}
          transform="rotate(90deg)"
          marginTop="25rem"
        />
      </Box>
    </Flex>
  );
};

export default Info;
