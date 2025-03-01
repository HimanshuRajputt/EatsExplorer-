import React from "react";
import {
  Box,
  Text,
  VStack,
  Badge,
  Flex,
  Button,
  Tag,
  Image,
  useColorModeValue,
  Icon,
  HStack,
  Divider,
  LinkBox,
  LinkOverlay,
  Heading
} from "@chakra-ui/react";

import {
  MapPin,
  Phone,
  Clock,
  Star,
  ExternalLink,
  ShoppingBag,
  Truck,
} from "lucide-react";



// Helper function to generate placeholder image URL
// Helper function to generate placeholder image URL
const getImageUrl = (name) => {
  // Create a deterministic seed from the restaurant name and a session identifier
  const sessionId = new Date().toDateString(); // Changes daily
  const nameHash = name 
    ? name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) 
    : Math.floor(Math.random() * 1000);
  
  // Combine the name hash with session ID to get a seed
  const seed = `${nameHash}-${sessionId}`;
  
  // Use a list of specific image IDs from Picsum that are restaurant/food-related
  const foodImageIds = [
    292, 429, 431, 488, 493, 499, 514, 
    525, 682, 824, 835, 844, 867, 999, 
    1058, 1146, 1147, 1154, 1238, 1239,
    1292, 1424, 1434, 1447, 1490, 1491
  ];
  
  // Create a simple hash from the seed string
  const seedNumber = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  // Select an image ID from our food images based on the seed
  const imageId = foodImageIds[seedNumber % foodImageIds.length];
  
  // Return a Picsum URL with the specific image ID
  return `https://picsum.photos/id/${imageId}/600/400`;
};


// Helper function to generate a "fake" rating
const generateRating = (name) => {
  const nameHash = name
    ? name.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
    : 0;
  return (3.5 + (nameHash % 15) / 10).toFixed(1);
};

const RestaurantCard = ({ restaurant }) => {
  const {
    name,
    formatted,
    address_line2,
    opening_hours,
    website,
    contact,
    facilities,
    catering,
    diet,
    distance,
  } = restaurant.properties;

  // Extract cuisine
  const cuisines = catering?.cuisine?.split(";") || [];

  // Check if delivery is available
  const hasDelivery = facilities?.delivery === true;

  // Check if outdoor seating is available
  const hasOutdoorSeating = facilities?.outdoor_seating === true;

  // Check if restaurant is vegetarian or vegan
  const isVegetarian = diet?.vegetarian === true;
  const isVegan = diet?.vegan === true;

  const rating = generateRating(name);

  const cardBg = useColorModeValue("white", "gray.800");
  const tagColorScheme = useColorModeValue("teal", "cyan");

  // Format distance to show in km with 1 decimal place
  const formattedDistance = distance !== undefined ? 
    `${(distance / 1000).toFixed(1)} km away` : 
    "";

  return (
    <LinkBox
      as="article"
      overflow="hidden"
      borderRadius="lg"
      boxShadow="md"
      bg={cardBg}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
    >
      <Box position="relative">
        <Image
          src={getImageUrl(name)}
          alt={name}
          h="200px"
          w="full"
          objectFit="cover"
        />

        {/* Price level indicator - for demo purposes */}
        <Tag
          position="absolute"
          top="4"
          right="4"
          colorScheme="green"
          size="md"
          borderRadius="full"
          px={3}
          fontWeight="bold"
        >
          ₹₹
        </Tag>

        {/* Delivery badge */}
        {hasDelivery && (
          <Tag
            position="absolute"
            top="4"
            left="4"
            colorScheme="purple"
            size="md"
            borderRadius="full"
            px={3}
          >
            <Icon as={Truck} size={16} mr={1} />
            Delivery
          </Tag>
        )}
      </Box>

      <Box p={5}>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading as="h3" size="md" noOfLines={1}>
            <LinkOverlay href="#">{name || "Unnamed Restaurant"}</LinkOverlay>
          </Heading>

          <Flex align="center" bg="yellow.50" p={1} borderRadius="md">
            <Icon as={Star} color="yellow.500" mr={1} />
            <Text fontWeight="bold">{rating}</Text>
          </Flex>
        </Flex>

        <HStack spacing={2} mb={3} flexWrap="wrap">
          {cuisines.map((cuisine, idx) => (
            <Badge
              key={idx}
              colorScheme={tagColorScheme}
              textTransform="capitalize"
              borderRadius="full"
              px={2}
              py={0.5}
            >
              {cuisine.replace("_", " ")}
            </Badge>
          ))}

          {isVegetarian && (
            <Badge colorScheme="green" borderRadius="full" px={2} py={0.5}>
              Vegetarian
            </Badge>
          )}

          {isVegan && (
            <Badge colorScheme="green" borderRadius="full" px={2} py={0.5}>
              Vegan
            </Badge>
          )}
        </HStack>

        <Divider my={3} />

        <VStack align="start" spacing={2}>
          <Flex align="start">
            <Icon as={MapPin} size={16} mr={2} mt={1} />
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {address_line2 || formatted || "Address not available"}
              {formattedDistance && (
                <Text as="span" fontWeight="bold" color="teal.500" ml={1}>
                  ({formattedDistance})
                </Text>
              )}
            </Text>
          </Flex>

          {opening_hours && (
            <Flex align="center">
              <Icon as={Clock} size={16} mr={2} />
              <Text fontSize="sm" color="gray.600">
                {opening_hours}
              </Text>
            </Flex>
          )}

          {contact?.phone && (
            <Flex align="center">
              <Icon as={Phone} size={16} mr={2} />
              <Text fontSize="sm" color="gray.600">
                {contact.phone}
              </Text>
            </Flex>
          )}
        </VStack>

        <Divider my={3} />

        <Flex justify="space-between" align="center">
          <HStack>
            {hasOutdoorSeating && (
              <Tag size="sm" variant="subtle" colorScheme="blue">
                Outdoor Seating
              </Tag>
            )}
          </HStack>

          <HStack>
            {website && (
              <Button
                as="a"
                href={website}
                target="_blank"
                size="sm"
                variant="outline"
                colorScheme="blue"
                leftIcon={<ExternalLink size={14} />}
              >
                Website
              </Button>
            )}

            <Button
              size="sm"
              colorScheme="teal"
              leftIcon={<ShoppingBag size={14} />}
            >
              Order Now
            </Button>
          </HStack>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default RestaurantCard;