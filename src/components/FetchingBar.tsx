import { Box, Progress, Text } from "@chakra-ui/react";
import React from "react";

const FetchingBar = (): JSX.Element => {
  return (
    <Box
      fontSize="xl"
      fontWeight="800"
      px="10"
      my={6}
      w="100%"
      textAlign="center"
    >
      <Text>{"Thinking"}</Text>
      <Progress w="100%" size="xs" colorScheme="cyan" isIndeterminate />
    </Box>
  );
};

export default FetchingBar;
