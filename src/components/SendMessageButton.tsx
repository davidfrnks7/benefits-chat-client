import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface SendMessageButtonProps {
  valid: boolean;
  fetchingNewMessage: boolean;
  submit: () => void;
}

const SendMessageButton = ({
  valid,
  fetchingNewMessage,
  submit
}: SendMessageButtonProps) => {
  return (
    <Button
      isDisabled={!valid || fetchingNewMessage ? true : false}
      h="100%"
      fontSize="3rem"
      p={2}
      type="button"
      onClick={() => {
        submit();
      }}
    >
      {" "}
      <Icon icon="iconamoon:send" />
    </Button>
  );
};

export default SendMessageButton;
