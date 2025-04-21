import React from "react";

function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="header-info">
        <span className="logo-text">정책찾기 챗봇</span>
      </div>
      <button title="닫기">×</button>
    </div>
  );
}

export default ChatHeader;
