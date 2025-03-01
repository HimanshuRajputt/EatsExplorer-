import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Spinner,
  Heading,
  SimpleGrid,
  Badge,
  Flex,
  Button,
  Tag,
  Image,
  useColorModeValue,
  Icon,
  HStack,
  Divider,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Search,
  Filter,
  Globe,
  ChevronRight,
  ExternalLink,
  ShoppingBag,
  Truck,
} from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  const {
    name,
    formatted,
    // address_line1,
    address_line2,
    // categories = [],
    opening_hours,
    website,
    contact,
    facilities,
    catering,
    diet,
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

  // Generate a "fake" rating if not available (for demonstration)
  const generateRating = () => {
    const nameHash = name
      ? name.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
      : 0;
    return (3.5 + (nameHash % 15) / 10).toFixed(1);
  };

  const rating = generateRating();

  // Generate placeholder image URL based on restaurant name
  const getImageUrl = () => {
    return `/api/placeholder/600/400`;
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const tagColorScheme = useColorModeValue("teal", "cyan");

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
          src={getImageUrl()}
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

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [myCity,setmyCIty]=useState("")

 useEffect(() => {
   navigator.geolocation.getCurrentPosition(
     async (position) => {
       const { latitude, longitude } = position.coords;
       console.log("User's Location:", latitude, longitude);

       try {
         // Fetch city name using reverse geocoding
         const geoResponse = await fetch(
           `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=5f88948b25dc494fb1d2d37573119bdb`
         );
         const geoData = await geoResponse.json();

         if (geoData.features.length > 0) {
           const city = geoData.features[0].properties.city || "Unknown City";
           setmyCIty(city)
           console.log("City Name:", city);
         } else {
           console.log("City name not found");
         }

         // Fetch restaurants after getting city name
         fetchRestaurants(latitude, longitude);
       } catch (error) {
         console.error("Error fetching city name:", error);
       }
     },
     (err) => {
       console.error("Geolocation Error:", err);
       setError("Location access denied. Using a default location.");
       setLoading(false);

       // Set a fallback location (e.g., Bangalore)
       fetchRestaurants(12.9716, 77.5946);
     }
   );
 }, []);

  const fetchRestaurants = async (lat, lon) => {
    const apiKey = "5f88948b25dc494fb1d2d37573119bdb"; // Replace with your actual API key
    const radius = 1000000; // 5km search radius

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=50&apiKey=${apiKey}`
      );

      if (response.data.features.length === 0) {
        setError("No restaurants found nearby.");
      } else {
        setRestaurants(response.data.features);
      }
    } catch (err) {
      setError("Failed to fetch restaurants. Please try again later.",err);
    } finally {
      setLoading(false);
    }
  };

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.properties.name || "";
    const cuisine = restaurant.properties.catering?.cuisine || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading
          as="h1"
          size="2xl"
          mb={2}
          bgGradient="linear(to-r, teal.400, cyan.600)"
          bgClip="text"
        >
          TastyFinds
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Discover delicious restaurants near you
        </Text>
        <Text fontSize="xl" color="gray.600">
          {` 📍 ${myCity}`}
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        mb={8}
        gap={4}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
      >
        <InputGroup maxW={{ base: "full", md: "md" }}>
          <InputLeftElement pointerEvents="none">
            <Search color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search by restaurant name or cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            boxShadow="sm"
          />
        </InputGroup>

        <HStack spacing={4}>
          <Button leftIcon={<Filter size={16} />} variant="outline">
            Filters
          </Button>
          <Button colorScheme="teal">Near Me</Button>
        </HStack>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" h="300px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Flex>
      ) : error ? (
        <Box p={5} borderRadius="md" bg="red.50" color="red.600">
          <Text>{error}</Text>
        </Box>
      ) : (
        <>
          <Heading size="lg" mb={6}>
            Restaurants Near You
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </SimpleGrid>

          {filteredRestaurants.length === 0 && (
            <Flex
              justify="center"
              align="center"
              h="200px"
              bg="gray.50"
              borderRadius="md"
            >
              <Text>
                No restaurants match your search. Try a different term.
              </Text>
            </Flex>
          )}

          {filteredRestaurants.length > 0 && (
            <Flex justify="center" mt={10}>
              <Button
                variant="outline"
                colorScheme="teal"
                rightIcon={<ChevronRight size={16} />}
              >
                Load More
              </Button>
            </Flex>
          )}
        </>
      )}
    </Container>
  );
};

export default NearbyRestaurants;
