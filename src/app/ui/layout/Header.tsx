"use client";
import React from "react";
import { Heading, Box } from "@chakra-ui/react";
// import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  const appName = "Green Thumb Farming Benefits Chat";

  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      alignContent="center"
      h="4vh"
      w="100%"
      px={4}
      boxShadow="rgba(0, 134, 255, 0.75) 0px 0px 15px, rgba(0, 134, 255, 0.5) 0px 0px 3px 1px"
      bg="rgba(49, 56, 220, 0.9)"
      borderRadius="0px 0px 10px 10px"
      _hover={{
        bg: "brand.main"
      }}
    >
      {/* Logo | Site Name */}
      <Box w="100%" m="auto" textAlign="center">
        <Heading as="h1" fontSize="xl">
          {appName}
        </Heading>
      </Box>
    </Box>
  );
};

export default Header;
