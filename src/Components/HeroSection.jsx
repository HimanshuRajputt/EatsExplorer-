import React, { useState } from "react";
import { 
  Box, Container, Stack, Heading, Text, Button, Flex, Image, useColorModeValue 
} from "@chakra-ui/react";
import { MapPin, Mic } from "lucide-react";
import SpeechToText from "./SpeechToText"; // Import SpeechToText component

const HeroSection = ({ onNavigate }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW="container.xl" py={12}>
        <Stack
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as="span"
                position="relative"
                bgGradient="linear(to-r, teal.400, cyan.600)"
                bgClip="text"
              >
                Discover Delicious
              </Text>
              <br />
              <Text as="span" color={useColorModeValue("teal.500", "teal.300")}>
                Restaurants Near You
              </Text>
            </Heading>
            <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="lg">
              Find the perfect dining spot with TastyFinds. Browse restaurants by
              location, cuisine, and more. Get personalized recommendations and
              discover your new favorite places to eat.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded="full"
                size="lg"
                fontWeight="bold"
                px={6}
                colorScheme="teal"
                onClick={() => onNavigate("features")}
                leftIcon={<MapPin size={18} />}
              >
                Find Restaurants
              </Button>
              <Button
                rounded="full"
                size="lg"
                fontWeight="bold"
                px={6}
                onClick={() => setShowModal(true)}
                leftIcon={<Mic size={18} />}
              >
                Try Voice Search
              </Button>
              <SpeechToText isOpen={showModal} onClose={() => setShowModal(false)} />
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="full"
            boxShadow="2xl"
            rounded="2xl"
            overflow="hidden"
          >
            <Image
              alt="Hero Image"
              fit="cover"
              align="center"
              w="100%"
              h={{ base: "100%", sm: "400px", lg: "500px" }}
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
