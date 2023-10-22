import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  Image,
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logopic from "../assets/images/logo.jpg";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../services/LanguageContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const isHomePage = location.pathname === "/";

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      transition="background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s"
    >
      {isHomePage && scrollPosition < 100 && (
        <Text fontSize="2rem" textAlign="center" paddingTop="5rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, incidunt?
        </Text>
      )}

      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between" // Adjust alignment here
        marginTop={
          location.pathname === "/design" ||
          location.pathname === "/about" ||
          location.pathname === "/contact"
            ? "0"
            : "5rem"
        }
      >
        <Box ml="1rem">
          <ChakraLink as={Link} to="/">
            <Image
              src={logopic}
              alt="logo"
              w="4rem"
              h="auto"
              borderRadius="50%"
            />
          </ChakraLink>
        </Box>

        <Flex flex="1" justifyContent="center" alignItems="center">
          {" "}
          {/* Nested Flex */}
          {!isMobile && (
            <Flex alignItems="center" spacing="4" gap="4rem">
              <Box>
                <ChakraLink as={Link} to="/" color="black" fontSize="xl">
                  <Text fontFamily="Poppins">{t("Home")}</Text>
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} to="/contact" color="black" fontSize="xl">
                  <Text fontFamily="Poppins">{t("Contact")}</Text>
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} to="/about" color="black" fontSize="xl">
                  <Text fontFamily="Poppins">{t("About")}</Text>
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} to="/design" color="black" fontSize="xl">
                  <Text fontFamily="Poppins">{t("Design")}</Text>
                </ChakraLink>
              </Box>
            </Flex>
          )}
          {!isMobile && (
            <Box ml="2rem">
              <Select onChange={handleLanguageChange} value={selectedLanguage}>
                <option value="en">EN</option>
                <option value="pl">PL</option>
                <option value="sv">SV</option>
              </Select>
            </Box>
          )}
        </Flex>

        {isMobile && (
          <IconButton
            icon={<HamburgerIcon />}
            size="md"
            aria-label="Open navigation menu"
            variant="ghost"
            onClick={onToggle}
            marginRight="1rem"
          />
        )}

        {/* Mobile */}
        {isMobile && (
          <Drawer isOpen={isOpen} size="full" onClose={onToggle}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  {/* Mobile Menu Items */}
                  {[
                    { path: "/", label: "Home" },
                    { path: "/contact", label: "Contact" },
                    { path: "/about", label: "About" },
                    { path: "/design", label: "Design" },
                  ].map((item) => (
                    <ChakraLink
                      as={Link}
                      to={item.path}
                      key={item.path}
                      marginBottom="1rem"
                      display="block"
                      onClick={onToggle}
                    >
                      {t(item.label)}
                    </ChakraLink>
                  ))}
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px" backgroundColor="gray">
                  <Select
                    onChange={handleLanguageChange}
                    value={selectedLanguage}
                    w="100%"
                    color="black"
                  >
                    <option value="en">EN</option>
                    <option value="pl">PL</option>
                    <option value="sv">SV</option>
                  </Select>
                </DrawerFooter>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        )}
      </Flex>
    </Flex>
  );
};
export default Navbar;
