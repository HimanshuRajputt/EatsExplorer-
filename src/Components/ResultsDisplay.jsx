import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import RestaurantCard from "./RestaurantCard";
import { distanceRanges } from "./SearchFilters";

const ResultsDisplay = ({ 
  loading, 
  error, 
  restaurants, 
  filteredRestaurants, 
  distanceFilter,
  setDistanceFilter
}) => {
  if (loading) {
    return (
      <Flex justify="center" align="center" h="300px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p={5} borderRadius="md" bg="red.50" color="red.600">
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <>
      <Heading size="lg" mb={6}>
        {distanceFilter === "all" 
          ? "Restaurants Near You" 
          : `Restaurants ${distanceRanges[distanceFilter].label}`}
        {filteredRestaurants.length > 0 && (
          <Text as="span" fontSize="md" fontWeight="normal" ml={2} color="gray.500">
            ({filteredRestaurants.length} found)
          </Text>
        )}
      </Heading>

      {restaurants.length === 0 ? (
        <Box p={5} borderRadius="md" bg="orange.50" color="orange.600">
          <Text>No restaurant data was found. Please try again or check your location settings.</Text>
        </Box>
      ) : filteredRestaurants.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          direction="column"
          h="200px"
          bg="gray.50"
          borderRadius="md"
          p={4}
        >
          <Text mb={2}>
            No restaurants found within {distanceRanges[distanceFilter].label}.
          </Text>
          {distanceFilter !== "all" && (
            <Button 
              variant="outline" 
              colorScheme="teal" 
              onClick={() => setDistanceFilter("all")}
              mt={2}
            >
              Show All Restaurants
            </Button>
          )}
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={index} 
                restaurant={restaurant}
              />
            ))}
          </SimpleGrid>

          {filteredRestaurants.length > 9 && (
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
    </>
  );
};

export default ResultsDisplay;