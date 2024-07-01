import React, { useState } from "react";
import { HStack, Textarea, VStack } from "@chakra-ui/react";
import SendMessageButton from "./SendMessageButton";
import NewConversationButton from "./NewConversationButton";
import FetchingBar from "./FetchingBar";

interface MessageFieldProps {
  fetchingNewMessage: boolean;
  conversationStared: boolean;
  newMessage: string;
  humanMessagesSent: boolean;
  setNewMessage: (text: string) => void;
  submitMessage: (text: string) => Promise<void>;
  newConversation: () => void;
}

const MessageField = ({
  fetchingNewMessage,
  conversationStared,
  newMessage,
  humanMessagesSent,
  setNewMessage,
  submitMessage,
  newConversation
}: MessageFieldProps): JSX.Element => {
  const [valid, setValid] = useState<boolean>(false);

  const handleFieldChange = (text: string) => {
    setNewMessage(text);

    if (text.length > 1) {
      setValid(true);
    }
  };

  const handleSubmit = () => {
    if (valid && !fetchingNewMessage && conversationStared) {
      submitMessage(newMessage)
        .then(() => {
          setNewMessage("");
          setValid(false);
        })
        .catch(() => {});
    }
  };

  return (
    <VStack
      bg="blackAlpha.700"
      p={6}
      spacing={0}
      w={{ base: "100%", lg: "55rem", xl: "90rem" }}
      alignItems="center"
      justifyContent="center"
    >
      {fetchingNewMessage ? <FetchingBar /> : undefined}

      {humanMessagesSent ? (
        <NewConversationButton newConversation={newConversation} />
      ) : undefined}

      <HStack w="100%" p={0} m={0} spacing={4}>
        <Textarea
          bg="whiteAlpha.200"
          color="white"
          isDisabled={!conversationStared || fetchingNewMessage ? true : false}
          resize="none"
          w="100%"
          h="100%"
          placeholder="Ask me a question about your employee benefits."
          name="new-message"
          value={newMessage}
          onChange={e => {
            handleFieldChange(e.target.value);
          }}
          _placeholder={{ color: "white" }}
          onKeyDown={e => {
            if (e.key === "Enter" && valid) {
              handleSubmit();
            }
          }}
        />
        <SendMessageButton
          valid={valid}
          fetchingNewMessage={fetchingNewMessage}
          submit={handleSubmit}
        />
      </HStack>
    </VStack>
  );
};

export default MessageField;
