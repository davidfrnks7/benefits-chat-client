import { Button } from "@chakra-ui/react";
import React from "react";

interface NewConversationButtonProps {
  newConversation: () => void;
}

const NewConversationButton = ({
  newConversation
}: NewConversationButtonProps): JSX.Element => {
  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => {
        newConversation();
      }}
    >
      {"Start a new conversation"}
    </Button>
  );
};

export default NewConversationButton;
