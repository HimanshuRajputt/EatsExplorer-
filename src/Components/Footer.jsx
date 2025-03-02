import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Flex,
  Text,
  Link,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaCoffee } from "react-icons/fa"; // Import social icons
import { Link as RouterLink } from "react-router-dom"; // Import for navigation

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {/* Logo & Copyright */}
          <Stack spacing={6}>
            <Flex align="center">
              <Icon as={FaCoffee} color="teal.500" boxSize={6} mr={2} />
              <Text
                fontWeight="bold"
                fontSize="xl"
                bgGradient="linear(to-r, teal.400, cyan.600)"
                bgClip="text"
              >
                TastyFinds
              </Text>
            </Flex>
            <Text fontSize="sm">© 2025 TastyFinds. All rights reserved.</Text>
          </Stack>

          {/* Product Links */}
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              Product
            </Text>
            <Link as={RouterLink} to="/restaurant-search">
              Restaurant Search
            </Link>
            <Link as={RouterLink} to="/voice-assistant">
              Voice Assistant
            </Link>
            <Link as={RouterLink} to="/city-guides">
              City Guides
            </Link>
            <Link as={RouterLink} to="/partner">
              Partner with us
            </Link>
          </Stack>

          {/* Company Links */}
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              Company
            </Text>
            <Link as={RouterLink} to="/about">
              About Us
            </Link>
            <Link as={RouterLink} to="/contact">
              Contact Us
            </Link>
            <Link as={RouterLink} to="/careers">
              Careers
            </Link>
            <Link as={RouterLink} to="/press">
              Press
            </Link>
          </Stack>

          {/* Legal & Social Media */}
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              Legal
            </Text>
            <Link as={RouterLink} to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link as={RouterLink} to="/terms">
              Terms of Service
            </Link>
            <Link as={RouterLink} to="/cookie-policy">
              Cookie Policy
            </Link>

            {/* Social Media Icons */}
            <Stack direction="row" spacing={6} mt={4}>
              <IconButton
                as="a"
                href="https://facebook.com"
                aria-label="Facebook"
                icon={<FaFacebook />}
              />
              <IconButton
                as="a"
                href="https://twitter.com"
                aria-label="Twitter"
                icon={<FaTwitter />}
              />
              <IconButton
                as="a"
                href="https://instagram.com"
                aria-label="Instagram"
                icon={<FaInstagram />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
