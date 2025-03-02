import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Avatar,
  Flex,
  Divider,
} from "@chakra-ui/react";
import {
    Mic,
    Star,
    MapPin
    
  } from "lucide-react";

const AboutSection = () => {
  return (
    <Box py={20}>
      <Container maxW="container.lg">
        <VStack spacing={10}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, teal.400, cyan.600)"
            bgClip="text"
            textAlign="center"
            mb={6}
          >
            About TastyFinds
          </Heading>

          <Text fontSize="xl" textAlign="center" maxW="3xl">
            Our mission is to connect food lovers with amazing restaurants in their area.
            We're passionate about helping local businesses thrive and ensuring you never have
            a mediocre meal again.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>
            <Box>
              <Heading as="h3" size="lg" mb={6}>
                Our Story
              </Heading>
              <Text>
              This platform helps users effortlessly discover
              nearby restaurants based on preferences.With 
              smart recommendations and real-time location-
              based search, it ensuresusers find great dining
               options quickly and easily.
              </Text>
              <Text mt={4}>
                Since our launch, we've helped thousands of people discover their new
                favorite dining spots and connected local restaurants with hungry customers.
              </Text>
            </Box>

            <Box>
              <Heading as="h3" size="lg" mb={6}>
                What Makes Us Different
              </Heading>
              <VStack align="start" spacing={4}>
                <HStack>
                  <Icon as={Star} color="yellow.400" />
                  <Text fontWeight="bold">Hyper-local focus</Text>
                </HStack>
                <Text>
                  We prioritize nearby options so you can find great food within minutes, not hours.
                </Text>

                <HStack>
                  <Icon as={Mic} color="teal.400" />
                  <Text fontWeight="bold">Voice search technology</Text>
                </HStack>
                <Text>
                  Our voice assistant makes it easy to find exactly what you're craving, hands-free.
                </Text>

                <HStack>
                  <Icon as={MapPin} color="red.400" />
                  <Text fontWeight="bold">Precise distance filters</Text>
                </HStack>
                <Text>
                  Filter by exact distance ranges to find options within your preferred travel radius.
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>

          <Divider my={10} />

          <Heading as="h3" size="lg" mb={8} textAlign="center">
  Our Team
</Heading>

<Flex justify="center">  
  <Box maxW="800px" w="full"> 
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} justifyContent="center">
      {[
        { name: "Himanshu Rajput", Role: "Founder/CEO" },
        { name: "Abdul Samad", Role: "CTO" },
        { name: "Omkar Patane", Role: "Director" },
      ].map((member) => (
        <VStack key={member.name} align="center"> 
          <Avatar size="xl" name={member.name} bg="teal.500" color="white" mb={3} />
          <Text fontWeight="bold" fontSize="lg">
            {member.name}
          </Text>
          <Text color="gray.500">{member.Role}</Text>
        </VStack>
      ))}
    </SimpleGrid>
  </Box>
</Flex>

        </VStack>
      </Container>
    </Box>
  );
};

export default AboutSection;
