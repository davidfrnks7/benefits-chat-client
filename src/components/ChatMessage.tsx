import {
  Box,
  HStack,
  Icon as ChakIcon,
  Text,
  SkeletonCircle,
  Skeleton,
  Flex
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";

interface ChatMessageProps extends ChatMessage {
  fetching?: boolean;
  skeleton?: boolean;
}

const ChatMessage = ({
  chatter,
  text,
  fetching,
  skeleton
}: ChatMessageProps): JSX.Element => {
  return (
    <HStack spacing={6} w="100%">
      {chatter === "AI" ? (
        skeleton ? (
          <Flex alignSelf="flex-start">
            <SkeletonCircle size="10" />
          </Flex>
        ) : fetching ? undefined : (
          <ChakIcon
            boxSize={10}
            as={Icon}
            alignSelf="flex-start"
            icon="arcticons:openai-chatgpt"
          />
        )
      ) : undefined}
      {skeleton ? (
        <Box
          w="100%"
          fontSize="xl"
          ml={chatter === "AI" ? "0" : "calc(1.5rem + 40px)"}
          mr={chatter === "Human" ? "0" : "calc(1.5rem + 40px)"}
        >
          <Skeleton>
            <Text>{text}</Text>
          </Skeleton>
        </Box>
      ) : (
        <Box
          w="100%"
          fontSize="xl"
          ml={chatter === "AI" ? "0" : "calc(1.5rem + 40px)"}
          mr={chatter === "Human" ? "0" : "calc(1.5rem + 40px)"}
        >
          {text.split("\n").map((line, index) => (
            <Text minH="2.5rem" key={`${index}-${line.replaceAll(" ", "-")}`}>
              {line}
            </Text>
          ))}
        </Box>
      )}
      {chatter === "Human" ? (
        skeleton ? (
          <Flex alignSelf="flex-start">
            <SkeletonCircle size="10" />
          </Flex>
        ) : (
          <ChakIcon
            boxSize={10}
            as={Icon}
            alignSelf="flex-start"
            icon="pajamas:profile"
          />
        )
      ) : undefined}
    </HStack>
  );
};

export default ChatMessage;
