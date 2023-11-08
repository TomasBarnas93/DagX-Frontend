import React from "react";
import { List, Flex, Box, Image } from "@chakra-ui/react";
import infoImg from "../assets/images/InfoImg.jpg";
import listPunkt1 from "../assets/images/listPunkt1.png";
// import listPunkt2 from "../assets/images/listPunkt2.png";

const Info = () => {
  const CustomListIcon = ({ src, ...props }) => (
    <Box as="span" {...props}>
      <Image src={src} alt="List Icon" boxSize="15rem" />
    </Box>
  );

  return (
    <Flex display="flex" justifyContent="center" alignItems="center">
      <Box textAlign="center">
        <List>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box>
              Konstverk kan beställas elektroniskt via min Facebook eller
              Instagram. En beställning anses vara giltig efter att ha mottagit
              bekräftelse från mig.
            </Box>
          </Flex>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box >
              För att beställa en tavla behöver du skriva några viktiga uppgifter
              så att jag kan fastställa priset för konstverket: Storlek, hur många
              och vilka färger vill du ha i sin tavla och om den ska ha en
              struktur.
            </Box>
          </Flex>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box >
              Vi diskuterar vilken effekt du önskar. Om jag ska anpassa konstverk
              till inredning eller kanske du har en inspiration vilken ska jag
              följa?
            </Box>
          </Flex>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box >
              Du har rätt till ett gratis korrigering.
            </Box>
          </Flex>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box >
              Jag kommer att skicka filmer eller bilder ”bakom scen” om du önskar
              bli uppdaterad.
            </Box>
          </Flex>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box >
              Möjlig leverans inom Sverige via PostNord eller DHL/UPS/BRING.
              Avhämtning på plats möjligt i Stockholm.
            </Box>
          </Flex>
          <Flex as="li" alignItems="center" fontSize="3xl" >
            <CustomListIcon src={listPunkt1} color="green.500" />
            <Box >
              För beställning till Polen gäller leverans via färjan. Lite längre
              väntetid kan förekomma.
            </Box>
          </Flex>
        </List>
      </Box>
      <Box>
        <Image
          src={infoImg}
          alt="Image"
          objectFit="cover"
          width={{ base: "50rem", md: "50rem", lg: "50rem", xl: "100rem" }}
          margin="auto"
          transform="rotate(90deg)"
        />
      </Box>
    </Flex>
  );
};

export default Info;