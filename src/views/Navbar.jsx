import { Link } from "react-router-dom";
import {
  Select,
  Image,
  Box,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logopic from "../assets/images/logo.jpg";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { LanguageContext } from "../services/LanguageContext";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    localStorage.setItem("selectedLanguage", newLanguage);
  };

  const handleCloseMenu = () => {
    if (isMobile && isOpen) {
      onToggle();
    }
  };

  return (
    <Flex
      bg="#f5f5dc"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      justifyContent="space-between"
      boxShadow='dark-lg'
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

      {/* Hamburger menu*/}
      {isMobile ? (
        isOpen ? (
          // If the mobile menu is open, show the CloseIcon
          <IconButton
            icon={<CloseIcon />}
            size="md"
            aria-label="Close navigation menu"
            variant="ghost"
            onClick={onToggle}
          />
        ) : (
          // If the mobile menu is closed, show the HamburgerIcon
          <IconButton
            icon={<HamburgerIcon />}
            size="md"
            aria-label="Open navigation menu"
            variant="ghost"
            onClick={onToggle}
          />
        )
      ) : (
        // Desktop
        <Flex alignItems="center">
          <Box p="2">
            <ChakraLink
              as={Link}
              to="/"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('Home')}</Text>
            </ChakraLink>
          </Box>
          <Box p="2">
            <ChakraLink
              as={Link}
              to="/contact"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('Contact')}</Text>
            </ChakraLink>
          </Box>
          <Box p="4">
            <ChakraLink
              as={Link}
              to="/about"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('About')}</Text>
            </ChakraLink>
          </Box>
          <Spacer />
          <Box p="4">
            <ChakraLink
              as={Link}
              to="/create"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('Create')}</Text>
            </ChakraLink>
          </Box>
          <Spacer />
          <Box mr="10">
            <Select onChange={handleLanguageChange}
            value={selectedLanguage}>
              <option value="en">EN</option>
              <option value="pl">PL</option>
              <option value="sv">SV</option>
            </Select>
          </Box>
        </Flex>
      )}

      {/* Mobile */}
      {isMobile && isOpen && (
        <Flex
          direction="column"
          alignItems="center"
          w="100%"
          py={2}
          bg="#f5f5dc"
        >
          <Box p="1">
            <ChakraLink
              as={Link}
              to="/"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('Home')}</Text>
            </ChakraLink>
          </Box>
          <Box p="1">
            <ChakraLink
              as={Link}
              to="/contact"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('Contact')}</Text>
            </ChakraLink>
          </Box>
          <Box p="1">
            <ChakraLink
              as={Link}
              to="/about"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('About')}</Text>
            </ChakraLink>
          </Box>
          <Box p="1">
            <ChakraLink
              as={Link}
              to="/create"
              color="black"
              fontSize="md"
              onClick={handleCloseMenu}
            >
              <Text fontFamily="Poppins">{t('Create')}</Text>
            </ChakraLink>
          </Box>
          <Box>
            <Select onChange={handleLanguageChange}
            value={selectedLanguage}>
              <option value="en">EN</option>
              <option value="pl">PL</option>
              <option value="sv">SV</option>
            </Select>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
