import React, { useState } from "react";

function ChatForm({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        type="text"
        placeholder="메시지를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button id="send-message" type="submit">
        전송
      </button>
    </form>
  );
}

export default ChatForm;
