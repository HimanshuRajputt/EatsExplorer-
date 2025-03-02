import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import {
  Menu,
  Map,
  Mic,
  Info,
  Phone,
  ChevronDown,
  ChevronUp,
  X,
  AlignJustify,
  Coffee,
  MapPin,
  Star,
} from "lucide-react";

const NavBar = ({ activeComponent, onNavigate }) => {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Box
        bg={bgColor}
        color={textColor}
        borderBottom={1}
        borderStyle="solid"
        borderColor={borderColor}
        position="sticky"
        top="0"
        zIndex="1000"
        px={4}
        boxShadow="sm"
      >
        <Flex
          color={textColor}
          minH="70px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
          maxW="container.xl"
          mx="auto"
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <X size={24} /> : <AlignJustify size={24} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link onClick={() => onNavigate(null)} _hover={{ textDecoration: "none" }}>
              <HStack spacing={2}>
                <Icon as={Coffee} color="teal.500" boxSize={6} />
                <Text
                  textAlign={useBreakpointValue({ base: "center", md: "left" })}
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, teal.400, cyan.600)"
                  bgClip="text"
                >
                  TastyFinds
                </Text>
              </HStack>
            </Link>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav activeComponent={activeComponent} onNavigate={onNavigate} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <Button
              as="a"
              display={{ base: "none", md: "inline-flex" }}
              colorScheme="teal"
              fontWeight={600}
              size="sm"
              onClick={() => onNavigate("features")}
              leftIcon={<MapPin size={16} />}
            >
              Find Restaurants
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav activeComponent={activeComponent} onNavigate={onNavigate} />
      </Collapse>
    </>
  );
};

const DesktopNav = ({ activeComponent, onNavigate }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("teal.500", "teal.300");
  const activeLinkColor = useColorModeValue("teal.500", "teal.300");

  const NAV_ITEMS = [
    {
      label: "Features",
      icon: <Menu size={16} />,
      key: "features",
      children: [
        {
          label: "Find Restaurants",
          subLabel: "Discover restaurants near you",
          icon: <Map size={16} />,
          key: "features",
        },
        {
          label: "Curated Lists",
          subLabel: "Top-rated places to eat",
          icon: <Star size={16} />,
          key: "features",
        },
      ],
    },
    {
      label: "Voice Assistant",
      icon: <Mic size={16} />,
      key: "voice",
    },
    {
      label: "About Us",
      icon: <Info size={16} />,
      key: "about",
    },
    {
      label: "Contact",
      icon: <Phone size={16} />,
      key: "contact",
    },
  ];

  return (
    <Stack direction="row" spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Box as="div" position="relative" role="group">
            <Link
              py={2}
              onClick={() => onNavigate(navItem.key)}
              fontSize="sm"
              fontWeight={500}
              color={activeComponent === navItem.key ? activeLinkColor : linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              display="flex"
              alignItems="center"
            >
              {navItem.icon && <Icon as={() => navItem.icon} mr={2} />}
              {navItem.label}
              {navItem.children && (
                <Icon
                  as={ChevronDown}
                  w={3}
                  h={3}
                  ml={1}
                  transition="all .25s ease-in-out"
                  _groupHover={{ transform: "rotate(180deg)" }}
                />
              )}
            </Link>

            {navItem.children && (
              <Stack
                position="absolute"
                top="100%"
                left={0}
                display="none"
                _groupHover={{ display: "flex" }}
                p={2}
                mt={2}
                zIndex={1}
                minW="200px"
                bg={("white", "gray.800")}
                boxShadow="lg"
                rounded="md"
              >
                {navItem.children.map((child) => (
                  <Link
                    key={child.label}
                    py={2}
                    px={3}
                    borderRadius="md"
                    _hover={{
                      bg: ("teal.50", "teal.900"),
                      color: linkHoverColor,
                    }}
                    onClick={() => onNavigate(child.key)}
                  >
                    <Stack direction="row" align="center">
                      {child.icon && <Icon as={() => child.icon} mr={2} />}
                      <Box>
                        <Text fontWeight={500} transition="all .3s ease">
                          {child.label}
                        </Text>
                        <Text fontSize="sm">{child.subLabel}</Text>
                      </Box>
                    </Stack>
                  </Link>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ activeComponent, onNavigate }) => {
  const NAV_ITEMS = [
    {
      label: "Features",
      icon: <Menu size={16} />,
      navKey: "features",
      children: [
        {
          label: "Find Restaurants",
          subLabel: "Discover restaurants near you",
          icon: <Map size={16} />,
          navKey: "features",
        },
        {
          label: "Curated Lists",
          subLabel: "Top-rated places to eat",
          icon: <Star size={16} />,
          navKey: "features",
        },
      ],
    },
    {
      label: "Voice Assistant",
      icon: <Mic size={16} />,
      navKey: "voice",
    },
    {
      label: "About Us",
      icon: <Info size={16} />,
      navKey: "about",
    },
    {
      label: "Contact",
      icon: <Phone size={16} />,
      navKey: "contact",
    },
  ];

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      boxShadow="md"
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem 
          key={navItem.navKey} 
          {...navItem} 
          onNavigate={onNavigate} 
          isActive={activeComponent === navItem.navKey}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, icon, navKey, onNavigate, isActive }) => {
  const { isOpen, onToggle } = useDisclosure();
  const activeLinkColor = useColorModeValue("teal.500", "teal.300");
  const normalLinkColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Flex
          align="center"
          onClick={() => !children && onNavigate(navKey)}
          cursor="pointer"
        >
          {icon && (
            <Icon 
              as={() => icon} 
              mr={2} 
              color={isActive ? activeLinkColor : "inherit"} 
            />
          )}
          <Text
            fontWeight={600}
            color={isActive ? activeLinkColor : normalLinkColor}
          >
            {label}
          </Text>
        </Flex>
        {children && (
          <Icon
            as={isOpen ? ChevronUp : ChevronDown}
            transition="all .25s ease-in-out"
            w={4}
            h={4}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.navKey}
                py={2}
                onClick={() => onNavigate(child.navKey)}
              >
                <Flex align="center">
                  {child.icon && <Icon as={() => child.icon} mr={2} />}
                  <Box>
                    <Text fontWeight={500}>{child.label}</Text>
                    <Text fontSize="sm">{child.subLabel}</Text>
                  </Box>
                </Flex>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default NavBar;