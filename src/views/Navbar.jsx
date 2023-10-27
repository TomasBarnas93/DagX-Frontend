import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../services/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { SlArrowUp } from "react-icons/sl";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const isHomePage = location.pathname === "/";
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    setShowScrollArrow(window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <Text
          fontSize={isMobile ? "1.5rem" : "2.3rem"}
          textAlign="center"
          paddingTop="5rem"
          fontFamily="Poiret One"
          direction="row"
          display={isMobile ? "block" : "inline"}
          dangerouslySetInnerHTML={{
            __html: `
      <span style="font-family: Aerotis; font-size: ${
        isMobile ? "3rem" : "4.5rem"
      }">A</span>
      ${isMobile ? t("MottoMobile") : t("Motto")}`,
          }}
        />
      )}

      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        marginTop={
          location.pathname === "/create" ||
          location.pathname === "/projects" ||
          location.pathname === "/contact" ||
          location.pathname.startsWith("/detail/")
            ? "1rem"
            : "5rem"
        }
      >
        <Flex flex="1" justifyContent="center" alignItems="center">
          {!isMobile && (
            <Flex
              alignItems="center"
              spacing="4"
              gap="4rem"
              opacity={scrollPosition > 100 ? 0 : 1}
            >
              <Box>
                <ChakraLink
                  as={Link}
                  to="/"
                  color="black"
                  fontSize="1.9rem"
                  className="underlineCustom2"
                >
                  <Text fontFamily="Poiret One">{t("Home")}</Text>
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink
                  as={Link}
                  to="/projects"
                  color="black"
                  fontSize="1.9rem"
                  className="underlineCustom2"
                >
                  <Text fontFamily="Poiret One">{t("Projects")}</Text>
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink
                  as={Link}
                  to="/contact"
                  color="black"
                  fontSize="1.9rem"
                  className="underlineCustom2"
                >
                  <Text fontFamily="Poiret One">{t("Contact")}</Text>
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink
                  as={Link}
                  to="/create"
                  color="black"
                  fontSize="1.9rem"
                  className="underlineCustom2"
                >
                  <Text fontFamily="Poiret One">{t("Create")}</Text>
                </ChakraLink>
              </Box>
            </Flex>
          )}
          {!isMobile && (
            <Box ml="2rem" opacity={scrollPosition > 100 ? 0 : 1}>
              <Select
                onChange={handleLanguageChange}
                value={selectedLanguage}
                fontFamily="Poiret One"
                fontSize="1.5rem"
              >
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
            size="lg"
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
                <DrawerHeader borderBottomWidth="1px" marginRight={10}>
                  <Flex justifyContent="end" width="100%">
                    <Select
                      onChange={handleLanguageChange}
                      value={selectedLanguage}
                      w="25%"
                      color="black"
                      fontFamily="Poiret One"
                      fontSize="1xl"
                    >
                      <option value="en">EN</option>
                      <option value="pl">PL</option>
                      <option value="sv">SV</option>
                    </Select>
                  </Flex>
                </DrawerHeader>
                <DrawerBody fontSize="4xl" fontFamily="Poiret One">
                  <Flex
                    direction="column"
                    gap={5}
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    {[
                      { path: "/", label: "Home" },
                      { path: "/projects", label: "Projects" },
                      { path: "/contact", label: "Contact" },
                      { path: "/create", label: "Create" },
                    ].map((item) => (
                      <ChakraLink
                        as={Link}
                        to={item.path}
                        key={item.path}
                        marginBottom="1rem"
                        display="block"
                        onClick={onToggle}
                        className="underlineCustom"
                      >
                        {t(item.label)}
                      </ChakraLink>
                    ))}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        )}
      </Flex>

      {!isMobile && showScrollArrow && (
        <IconButton
          icon={<SlArrowUp size="2.5rem" />}
          variant="ghost"
          onClick={scrollToTop}
          position="fixed"
          right="5rem"
          marginTop="4rem"
          boxSize="3em"
        />
      )}
    </Flex>
  );
};
export default Navbar;
