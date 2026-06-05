import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function PaintingCardLeftText({
  image,
  fontSizeName = { base: "2.5rem", md: "5xl" },
  fontSizeSize = { base: "1.2rem", md: "2xl" },
}) {
  const { t } = useTranslation();

  const title = image.name || image.title;
  const imageUrl = image.url || image.mainImage?.url || "";
  const detailLink = `/detail/${image._id || image.originalIndex + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, transition: { type: "spring", duration: 1.5 } }}
      viewport={{ once: true }}
    >
      <Link to={detailLink}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          textAlign="justify"
          marginTop="10rem"
          justifyContent="space-between"
          marginRight={{ md: "5rem" }}
        >
          <Box
            marginTop={{ base: "2rem" }}
            ml={4}
            fontWeight="bold"
            marginRight={{ md: "5rem" }}
            fontFamily="Poiret One"
            textAlign="center"
            marginLeft="5rem"
          >
            <Text fontSize={fontSizeName}>{title}</Text>
            <Box className="underlineCustom" mt={4} />
            <Text fontSize={fontSizeSize}>{image.size}</Text>

            <Text fontSize="lg" mt={6} color={image.available ? "green.600" : "red.600"}>
              {image.available ? t("Available") : t("Sold")}
            </Text>
          </Box>

          <Box className="imageWrapper">
            <Image
              src={imageUrl}
              alt={title}
              objectFit="cover"
              width={{ base: "50rem", md: "90rem" }}
              margin="auto"
            />
          </Box>
        </Flex>
      </Link>
    </motion.div>
  );
}

export default PaintingCardLeftText;