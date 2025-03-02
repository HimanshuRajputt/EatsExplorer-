import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex
} from "@chakra-ui/react";

const Header = ({ cityName }) => {
  return (
    <Box mb={8}>
      <Flex
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      minH="30vh"  // Adjust height as needed
    >
      <Heading
        as="h1"
        size="2xl"
        mb={4}
        bgGradient="linear(to-r, teal.400, cyan.600)"
        bgClip="text"
      >
        TastyFinds
      </Heading>
      <Text fontSize="xl" color="gray.600">
        Discover delicious restaurants near you
      </Text>
      <Text fontSize="xl" color="gray.600">
        {` 📍 ${cityName || "Loading location..."}`}
      </Text>
      </Flex>
    </Box>
  );
};

export default Header;