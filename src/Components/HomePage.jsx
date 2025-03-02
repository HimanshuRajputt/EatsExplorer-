import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  VStack,
  Avatar,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MapPin,
  Mic,
  Coffee,
  Clock,
  ShoppingBag,
} from "lucide-react";

// Import your components
import NavBar from "./Navbar";
import NearbyRestaurants from "./NearbyRestaurants";
import SpeechToText from "./SpeechToText";
import AboutSection from "../pages/AboutSection";
import ContactSection from "../pages/ContectSection";

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNavigation = (component) => {
    setActiveComponent(component);
    // You could also use React Router for actual navigation
    // window.scrollTo(0, 0);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "features":
        return <NearbyRestaurants />;
      case "voice":
        return <SpeechToText isOpen={true} onClose={() => setActiveComponent(null)} />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HeroSection onNavigate={handleNavigation} setShowModal={setShowModal} />;
    }
  };

  return (
    <Box>
      <NavBar activeComponent={activeComponent} onNavigate={handleNavigation} />
      <Box minH="calc(100vh - 70px)">{renderComponent()}</Box>
   
      <SpeechToText isOpen={showModal} onClose={() => setShowModal(false)} />
      
    </Box>
  );
};

const HeroSection = ({ onNavigate, setShowModal }) => {
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

        <Box mt={{ base: 10, md: 20 }}>
          <Heading
            textAlign="center"
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="extrabold"
            mb={10}
          >
            Popular Categories
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10}>
            {[
              { name: "Breakfast & Brunch", icon: Coffee, color: "yellow" },
              { name: "Lunch Spots", icon: Clock, color: "green" },
              { name: "Dinner & Fine Dining", icon: ShoppingBag, color: "purple" },
              { name: "Cafés & Bistros", icon: MapPin, color: "red" },
            ].map((category) => (
              <VStack
                key={category.name}
                bg={useColorModeValue("white", "gray.800")}
                p={5}
                boxShadow="md"
                borderRadius="lg"
                align="center"
                spacing={4}
                cursor="pointer"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "lg",
                }}
                onClick={() => onNavigate("features")}
              >
                <Flex
                  w={16}
                  h={16}
                  align="center"
                  justify="center"
                  color={`${category.color}.500`}
                  rounded="full"
                  bg={`${category.color}.100`}
                >
                  <Icon as={category.icon} w={8} h={8} />
                </Flex>
                <Text fontWeight="medium" fontSize="md" textAlign="center">
                  {category.name}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        <Box mt={{ base: 16, md: 24 }}>
          <Heading
            textAlign="center"
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="extrabold"
            mb={10}
          >
            What Our Users Are Saying
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {[
              {
                name: "Sarah J.",
                text: "TastyFinds helped me discover so many hidden gems in my neighborhood. The voice search feature is incredibly convenient!",
                location: "Mumbai",
              },
              {
                name: "Rahul M.",
                text: "This app has completely changed how I find new restaurants. The distance filter is super useful for finding places within walking distance.",
                location: "Delhi",
              },
              {
                name: "Priya T.",
                text: "I love how easy it is to filter by cuisine types. Found my new favorite South Indian place thanks to TastyFinds!",
                location: "Bangalore",
              },
            ].map((testimonial, idx) => (
              <Box
                key={idx}
                bg={useColorModeValue("white", "gray.800")}
                p={6}
                boxShadow="md"
                borderRadius="lg"
                position="relative"
                zIndex={1}
              >
                <Flex direction="column" h="full">
                  <Box mb={4}>
                    <Text fontSize="lg" fontStyle="italic">
                      "{testimonial.text}"
                    </Text>
                  </Box>
                  <Flex mt="auto" align="center">
                    <Avatar
                      size="md"
                      name={testimonial.name}
                      bg="teal.500"
                      color="white"
                      mr={4}
                    />
                    <Box>
                      <Text fontWeight="bold">{testimonial.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {testimonial.location}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;