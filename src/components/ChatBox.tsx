import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";

interface ChatBoxProps {
  chatHistory: ChatMessage[];
  fetchingNewMessage: boolean;
  conversationStared: boolean;
}

const ChatBox = ({
  chatHistory,
  fetchingNewMessage,
  conversationStared
}: ChatBoxProps): JSX.Element => {
  const dummyMessages: ChatMessage[] = [
    { chatter: "AI", text: "Chat Message" },
    { chatter: "Human", text: "Chat Message" },
    { chatter: "AI", text: "Chat Message" },
    { chatter: "Human", text: "Chat Message" },
    { chatter: "AI", text: "Chat Message" },
    { chatter: "Human", text: "Chat Message" },
    { chatter: "AI", text: "Chat Message" },
    { chatter: "Human", text: "Chat Message" },
    { chatter: "AI", text: "Chat Message" },
    { chatter: "Human", text: "Chat Message" }
  ];

  return (
    <VStack
      bg="blackAlpha.700"
      h="100%"
      w={{ base: "100%", lg: "55rem", xl: "90rem" }}
      spacing={6}
      pt={10}
      overflow="scroll"
    >
      {Array.isArray(chatHistory)
        ? chatHistory.map(({ chatter, text }, index) => (
            <Flex
              w="100%"
              px={10}
              key={`${chatter}-${text.replaceAll(" ", "-")}-${index}`}
              justifyContent={chatter === "AI" ? "flex-start" : "flex-end"}
              textAlign={chatter === "AI" ? "left" : "right"}
            >
              <ChatMessage chatter={chatter} text={text} />
            </Flex>
          ))
        : undefined}
      {fetchingNewMessage ? (
        <ChatMessage chatter={"AI"} text={""} fetching={fetchingNewMessage} />
      ) : undefined}
      {!conversationStared
        ? dummyMessages.map(({ chatter, text }, index) => (
            <Flex
              alignSelf={chatter === "AI" ? "flex-start" : "flex-end"}
              px={10}
              key={`${chatter}-${text.replaceAll(" ", "-")}-${index}`}
              textAlign={chatter === "AI" ? "left" : "right"}
            >
              <ChatMessage chatter={chatter} text={text} skeleton />
            </Flex>
          ))
        : undefined}
    </VStack>
  );
};

export default ChatBox;
