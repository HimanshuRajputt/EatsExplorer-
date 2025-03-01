import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    HStack,
    Image,
    Flex,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
  
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);
  
  const HomePage = () => {
    const navigate=useNavigate()
    return (
      <Box w="100vw" minH="100vh" bg="gray.900" color="white" p={8}>
        {/* Hero Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          pt={12}
        >
          <Heading size="2xl" fontWeight="bold" letterSpacing="wide">
            Welcome to EatsExplorer 🍽️
          </Heading>
          <Text fontSize="xl" mt={4} maxW="600px">
            **Find the best restaurants near you** with **AI-powered
            recommendations, voice search, and real-time location tracking**.
          </Text>
          <MotionButton
            mt={6}
            px={6}
            py={3}
            fontSize="lg"
            colorScheme="orange"
            whileHover={{ scale: 1.1 }}
          >
            Explore Now
          </MotionButton>
        </Flex>
  
        {/* Features Section */}
        <VStack spacing={8} mt={12} align="center">
          <MotionBox
            bg="gray.800"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            w="80%"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
          >
            <Heading size="lg" mt={4}>
              🌍 Location-Based Restaurant Finder
            </Heading>
            <Text mt={2}>
              Find restaurants **near you** using real-time GPS tracking.
            </Text>
          </MotionBox>
  
          <MotionBox
            bg="gray.800"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            w="80%"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
          >
            <Heading size="lg" mt={4}>
              🗣️ Voice Search Enabled
            </Heading>
            <Text mt={2}>
              Easily search for restaurants **by speaking** instead of typing.
            </Text>
          </MotionBox>
  
          <MotionBox
            bg="gray.800"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            w="80%"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
          >
            <Heading size="lg" mt={4}>
              🤖 AI-Powered Recommendations
            </Heading>
            <Text mt={2}>
              Get **personalized restaurant suggestions** based on your taste.
            </Text>
          </MotionBox>
        </VStack>
  
        {/* Call to Action */}
        <Flex justify="center" mt={12}>
          <MotionButton
            colorScheme="orange"
            px={6}
            py={3}
            fontSize="lg"
            whileHover={{ scale: 1.1 }}
            onClick={()=>navigate("/nearby-restaurants")}
          >
            Start Exploring
          </MotionButton>
        </Flex>
  
        {/* Footer */}
        <Box textAlign="center" mt={12} opacity={0.6}>
          <Text>© 2024 EatsExplorer. All rights reserved.</Text>
        </Box>
      </Box>
    );
  };
  
  export default HomePage;
  