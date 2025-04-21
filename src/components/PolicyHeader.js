import React from "react";
import "../styles/PolicyCompare.css"; 

function PolicyHeader({ onClose }) {
  return (
    <div className="chat-header">
      <div className="header-info">
        <span className="logo-text">정책 비교</span>
      </div>
      {onClose && (
        <button title="닫기" className="close-button" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}

export default PolicyHeader;
