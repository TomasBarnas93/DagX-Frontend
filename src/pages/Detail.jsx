import { Image, Heading, Container, Button } from "@chakra-ui/react";
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
      <Image src={image.url} />
      <Heading size="lg">{image.name}</Heading>
      <Link to="/contact">
        <Button colorScheme="red">{t("BtnAskForPrice")}</Button>
      </Link>
    </Container>
  );
}

export default Detail;
