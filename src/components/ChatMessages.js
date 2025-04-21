import React from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ messages }) {
  return (
    <>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} chat={msg} />
      ))}
    </>
  );
}

export default ChatMessages;
