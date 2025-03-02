import React from "react";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const Header = ({ cityName }) => {
  return (
    <Box mb={8}>
      <Heading
        as="h1"
        size="2xl"
        mb={4}
        bgGradient="linear(to-r, teal.400, cyan.600)"
        bgClip="text"
      >
        EatsExplorer
      </Heading>
      <Text fontSize="xl" color="gray.600">
        Discover delicious restaurants near you
      </Text>
      <Text fontSize="xl" color="gray.600">
        {` 📍 ${cityName || "Loading location..."}`}
      </Text>
    </Box>
  );
};

export default Header;