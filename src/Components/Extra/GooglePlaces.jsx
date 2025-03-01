import React, { useState } from "react";
import { Input, Box, List, ListItem } from "@chakra-ui/react";

const GooglePlaces = () => {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    setPlace(e.target.value);
    if (e.target.value.length > 2) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=AIzaSyAtZrBwppXlwsd8Bf0pP9T5ABUlLqCk6aQ`
      );
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    }
  };

  return (
    <Box width="400px" p={4} borderWidth="1px" borderRadius="md">
      <Input
        placeholder="Search a place..."
        value={place}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <List mt={2} borderWidth="1px" borderRadius="md">
          {suggestions.map((s) => (
            <ListItem
              key={s.place_id}
              p={2}
              _hover={{ bg: "gray.100", cursor: "pointer" }}
            >
              {s.description}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default GooglePlaces;
