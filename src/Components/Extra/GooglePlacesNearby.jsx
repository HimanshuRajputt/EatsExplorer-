import React, { useState } from "react";
import { Box, Button, List, ListItem, Spinner, Text } from "@chakra-ui/react";

const GooglePlacesNearby = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getNearbyRestaurants = async (latitude, longitude) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=AIzaSyAtZrBwppXlwsd8Bf0pP9T5ABUlLqCk6aQ`
      );
      const data = await response.json();

      if (data.results) {
        setRestaurants(data.results.slice(0, 10)); // Get top 10 restaurants
      } else {
        setError("No restaurants found.");
      }
    } catch (err) {
      setError("Failed to fetch restaurants.",err);
    }

    setLoading(false);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getNearbyRestaurants(latitude, longitude);
        },
        () => setError("Location access denied.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box width="400px" p={4} borderWidth="1px" borderRadius="md">
      <Button
        colorScheme="blue"
        onClick={handleGetLocation}
        isDisabled={loading}
      >
        {loading ? <Spinner size="sm" /> : "Find Restaurants Near Me"}
      </Button>

      {error && (
        <Text color="red.500" mt={2}>
          {error}
        </Text>
      )}

      <List mt={3}>
        {restaurants.map((restaurant, index) => (
          <ListItem key={index} p={2} borderBottomWidth="1px">
            <Text fontWeight="bold">{restaurant.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {restaurant.vicinity}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GooglePlacesNearby;
