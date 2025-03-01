import React from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

// Distance ranges in meters
export const distanceRanges = {
  "all": { label: "All Distances", min: 0, max: Infinity },
  "0-1": { label: "Under 1 km", min: 0, max: 1000 },
  "1-2": { label: "1-2 km", min: 1000, max: 2000 },
  "2-5": { label: "2-5 km", min: 2000, max: 5000 },
  "5-10": { label: "5-10 km", min: 5000, max: 10000 },
  "10+": { label: "10+ km", min: 10000, max: Infinity }
};

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  distanceFilter, 
  handleDistanceChange, 
  handleNearMe 
}) => {
  return (
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
        <Menu>
          <MenuButton 
            as={Button} 
            leftIcon={<Filter size={16} />} 
            rightIcon={<ChevronDown size={16} />}
            variant="outline"
          >
            Distance: {distanceRanges[distanceFilter].label}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleDistanceChange("all")}>
              All Distances
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => handleDistanceChange("0-1")}>
              Under 1 km
            </MenuItem>
            <MenuItem onClick={() => handleDistanceChange("1-2")}>
              1-2 km
            </MenuItem>
            <MenuItem onClick={() => handleDistanceChange("2-5")}>
              2-5 km
            </MenuItem>
            <MenuItem onClick={() => handleDistanceChange("5-10")}>
              5-10 km
            </MenuItem>
            <MenuItem onClick={() => handleDistanceChange("10+")}>
              10+ km
            </MenuItem>
          </MenuList>
        </Menu>
        <Button 
          colorScheme="teal"
          onClick={handleNearMe}
        >
          Near Me
        </Button>
      </HStack>
    </Flex>
  );
};

export default SearchFilters;
