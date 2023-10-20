import React from "react";
import {
  Image,
  Heading,
  Flex,
  Container,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import konst from "../data/data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Detail() {
  const { id } = useParams();
  const painting = konst.find((p) => p.id === id);
  const { t } = useTranslation();

  if (!painting) {
    return <div>Painting not found</div>;
  }

  const { name, image } = painting;

  return (
    <Container>
    
          <Image
            src={image}
            borderRadius="lg"
            w="100%"
            h="50vh"
            objectFit="cover"
          />
          <Flex justifyContent="center" alignItems="center">
            <Heading size="lg">{name}</Heading>
          </Flex>
  
      <Link to="/contact">
        <Button colorScheme='red'>{t('BtnAskForPrice')}</Button>
      </Link>
    </Container>
  );
}

export default Detail;
