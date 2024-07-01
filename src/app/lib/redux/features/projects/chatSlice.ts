import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ChatHistorySlice = {
  chatHistory: [] as ChatMessage[],
  fetchingNewMessage: false,
  conversationStarted: false,
  humanMessagesSent: false
};

const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    // Start the chat conversation
    startConversation: (
      state: ChatHistorySlice,
      action: PayloadAction<NewChatMessagePayload>
    ) => {
      if (!state.fetchingNewMessage && !state.conversationStarted) {
        state.fetchingNewMessage = true;

        // Initial message AI
        const { chatter, text } = action.payload;

        // Adding chat message to chat history
        if (chatter === "AI") {
          state.chatHistory.push({ chatter: chatter, text });
        }

        state.conversationStarted = true;
      }
    },
    // Add to the conversation
    continueConversation: (
      state: ChatHistorySlice,
      action: PayloadAction<NewChatMessagePayload>
    ) => {
      // New Message
      const { chatter, text } = action.payload;

      // Adding chat message to chat history
      state.chatHistory.push({ chatter, text });

      if (chatter === "Human" && state.conversationStarted) {
        state.humanMessagesSent = true;
      }
    },
    // Clear chat history
    clearConversation: (state: ChatHistorySlice) => {
      state.chatHistory = [] as ChatMessage[];
      state.fetchingNewMessage = false;
      state.conversationStarted = false;
      state.humanMessagesSent = false;
    },
    thinking: (state: ChatHistorySlice) => {
      state.fetchingNewMessage = true;
    },
    resolved: (state: ChatHistorySlice) => {
      state.fetchingNewMessage = false;
    }
  }
});

export const {
  startConversation,
  continueConversation,
  clearConversation,
  thinking,
  resolved
} = chatSlice.actions;
export default chatSlice.reducer;
