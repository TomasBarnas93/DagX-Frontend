import { Image, Heading, Container, Button, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect } from "react";
import { ImageContext } from "../services/ImageContext";

function Detail() {
  const { id } = useParams();
  const images = useContext(ImageContext);
  const image = images[id - 1];
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Image src={image.url} alt={image.name} />
      <Heading size="lg">{image.name}</Heading>
      {image.details && image.details.map((detail, index) => (
        <Box key={index} mt={4}>
          <Image src={detail.subUrl} alt={`Detail ${index + 1}`} />
        </Box>
      ))}
      <Link to="/contact" mt={4}>
        <Button colorScheme="red">{t("BtnAskForPrice")}</Button>
      </Link>
      <Link to="/" mt={4}>
        <Button colorScheme="green">{t("BacktoHome")}</Button>
      </Link>
    </Container>
  );
}

export default Detail;
