"use client";
import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  clearConversation,
  continueConversation,
  resolved,
  startConversation,
  thinking
} from "./lib/redux/features/projects/chatSlice";
import ChatBox from "@/components/ChatBox";
import axios from "axios";
import MessageField from "@/components/MessageField";

const Home = (): JSX.Element => {
  // Stated
  const [newMessage, setNewMessage] = useState<string>("");

  // Redux
  const chat = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();

  // Handlers
  const handleClearHistory = (): Promise<void> =>
    new Promise((resolve, reject) => {
      axios({ method: "delete", url: process.env.NEXT_PUBLIC_CHAT_API_ROUTE })
        .then(() => {
          setNewMessage("");
          dispatch(clearConversation());
          dispatch(resolved());
          return resolved();
        })
        .catch(err => {
          console.warn(err);
          return reject(err);
        });

      // dispatch(thinking());
      // dispatch(clearConversation())
      // dispatch(resolved());
    });

  const handleSendNewMessage = (): Promise<void> =>
    new Promise((resolve, reject) => {
      dispatch(continueConversation({ chatter: "Human", text: newMessage }));

      dispatch(thinking());

      axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_CHAT_API_ROUTE,
        data: { text: newMessage }
      })
        .then(({ data }) => {
          const chatter: Chatter = data.type.toUpperCase();
          const text = data.content;
          dispatch(continueConversation({ chatter, text }));
          dispatch(resolved());
          return resolve();
        })
        .catch(err => {
          console.warn(err);
          dispatch(resolved());
          return reject();
        });

      // dispatch(
      //   startConversation({
      //     chatter: "AI",
      //     text: "AI response placeholder."
      //   })
      // );

      // dispatch(resolved());
    });

  useEffect(() => {
    if (
      chat.chatHistory.length === 0 &&
      !chat.conversationStarted &&
      !chat.fetchingNewMessage
    ) {
      axios({ method: "delete", url: process.env.NEXT_PUBLIC_CHAT_API_ROUTE })
        .then(() => {
          return;
        })
        .then(() => {
          axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_CHAT_API_ROUTE,
            data: { text: "Hello, what can you do for me?" }
          })
            .then(({ data }) => {
              const chatter: Chatter = data.type.toUpperCase();
              const text = data.content;
              dispatch(startConversation({ chatter, text }));
              dispatch(resolved());
            })
            .catch(err => {
              console.warn(err);
            });
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }, [
    chat.chatHistory.length,
    chat.conversationStarted,
    chat.fetchingNewMessage,
    dispatch
  ]);

  return (
    <main>
      <VStack
        h="96vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
        spacing={0}
      >
        <ChatBox
          chatHistory={chat.chatHistory}
          fetchingNewMessage={chat.fetchingNewMessage}
          conversationStared={chat.conversationStarted}
        />
        <MessageField
          fetchingNewMessage={chat.fetchingNewMessage}
          conversationStared={chat.conversationStarted}
          newMessage={newMessage}
          humanMessagesSent={chat.humanMessagesSent}
          setNewMessage={setNewMessage}
          submitMessage={handleSendNewMessage}
          newConversation={handleClearHistory}
        />
      </VStack>
    </main>
  );
};

export default Home;
