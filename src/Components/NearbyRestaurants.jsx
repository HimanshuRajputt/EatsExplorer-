import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import Header from "./Header";
import SearchFilters ,{distanceRanges} from "./SearchFilters";
import ResultsDisplay from "./ResultsDisplay";
import { calculateDistance } from "../utils/locationUtils";

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [myCity, setMyCity] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState("all");

  // Store API key in ref to avoid recreating on every render
  const apiKey = useRef("5f88948b25dc494fb1d2d37573119bdb");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's Location:", latitude, longitude);
        setUserLocation({ latitude, longitude });

        try {
          // Fetch city name using reverse geocoding
          const geoResponse = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey.current}`
          );
          const geoData = await geoResponse.json();

          if (geoData.features.length > 0) {
            const city = geoData.features[0].properties.city || "Unknown City";
            setMyCity(city);
            console.log("City Name:", city);
          } else {
            console.log("City name not found");
          }

          // Fetch restaurants after getting city name
          // For demonstration, using a fixed location instead of actual location
          // Change this line to use actual location: fetchRestaurants(latitude, longitude)
         // fetchRestaurants(28.644800, 77.216721);  ==========================================================================
          fetchRestaurants(latitude,longitude);
        } catch (error) {
          console.error("Error fetching city name:", error);
          setError("Failed to fetch location data. Please try again.");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation Error:", err);
        setError("Location access denied. Using a default location.");
        setLoading(false);

        // Set a fallback location (e.g., Bangalore)
        const fallbackLat = 12.9716;
        const fallbackLon = 77.5946;
        setUserLocation({ latitude: fallbackLat, longitude: fallbackLon });
        fetchRestaurants(fallbackLat, fallbackLon);
      }
    );
  }, []);

  const fetchRestaurants = async (lat, lon) => {
    // This is the maximum radius the API will accept
    const radius = 50000; // 50km search radius

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=50&apiKey=${apiKey.current}`
      );

      if (!response.data || !response.data.features || response.data.features.length === 0) {
        console.error("No restaurant data found in API response");
        setError("No restaurants found nearby.");
        setLoading(false);
        return;
      }

      console.log(`Found ${response.data.features.length} restaurants from API`);
      
      // Add distance to each restaurant
      const restaurantsWithDistance = response.data.features.map(restaurant => {
        const resLat = restaurant.properties?.lat;
        const resLon = restaurant.properties?.lon;
        
        // Calculate distance if coordinates are available
        const distance = calculateDistance(lat, lon, resLat, resLon);
        
        return {
          ...restaurant,
          properties: {
            ...restaurant.properties,
            distance: distance
          }
        };
      });

      // Sort by distance
      const sortedRestaurants = restaurantsWithDistance.sort((a, b) => {
        // Handle null distances (put them at the end)
        if (a.properties.distance === null) return 1;
        if (b.properties.distance === null) return -1;
        return a.properties.distance - b.properties.distance;
      });
      
      console.log(`Processed ${sortedRestaurants.length} restaurants with distance data`);
      
      setRestaurants(sortedRestaurants);
      // Initially show all restaurants
      setFilteredRestaurants(sortedRestaurants);
      
      console.log("Restaurant data successfully processed");
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError(`Failed to fetch restaurants: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Apply both search and distance filters
  useEffect(() => {
    if (restaurants.length === 0) return;
    
    console.log(`Applying filters: searchTerm=${searchTerm}, distanceFilter=${distanceFilter}`);
    
    const filtered = restaurants.filter((restaurant) => {
      // First filter by search term
      const name = restaurant.properties?.name || "";
      const cuisine = restaurant.properties?.catering?.cuisine || "";
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Then filter by distance
      if (distanceFilter === "all") return true;
      
      const distance = restaurant.properties?.distance;
      if (distance === null || distance === undefined) return false;
      
      const range = distanceRanges[distanceFilter];
      return distance >= range.min && distance <= range.max;
    });
    
    console.log(`Filter applied: ${filtered.length} restaurants match criteria`);
    setFilteredRestaurants(filtered);
  }, [searchTerm, distanceFilter, restaurants]);

  // Handle distance filter change
  const handleDistanceChange = (range) => {
    console.log(`Changing distance filter to: ${range}`);
    setDistanceFilter(range);
  };

  // Handle "Near Me" button click
  const handleNearMe = () => {
    console.log("Near Me button clicked");
    setDistanceFilter("0-1");
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Header cityName={myCity} />
      
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        distanceFilter={distanceFilter}
        handleDistanceChange={handleDistanceChange}
        handleNearMe={handleNearMe}
      />
      
      <ResultsDisplay 
        loading={loading}
        error={error}
        restaurants={restaurants}
        filteredRestaurants={filteredRestaurants}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
      />
    </Container>
  );
};

export default NearbyRestaurants;