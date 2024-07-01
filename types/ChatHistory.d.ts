interface ChatHistorySlice {
  chatHistory: ChatMessage[];
  fetchingNewMessage: boolean;
  conversationStarted: boolean;
  humanMessagesSent: boolean;
}

type Chatter = "Human" | "AI";

interface ChatMessage {
  chatter: string;
  text: string;
}

interface NewChatMessagePayload {
  chatter: Chatter;
  text: string;
}
