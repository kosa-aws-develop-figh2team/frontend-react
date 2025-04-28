import React, { useState, useEffect } from 'react';

//헤더
import Header from "./components/Header";

// 챗봇
import ChatMessages from "./components/ChatMessages";
import ChatForm from "./components/ChatForm";
import "./styles/chatbot.css";

// 정책 비교
import PolicySearch from "./components/PolicySearch";
import PolicyCompare from "./components/PolicyCompare";

function App() {
  const [messages, setMessages] = useState([
    { role: "model", text: "안녕하세요! 무엇을 도와드릴까요?" }
  ]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages([...messages, { role: "user", text }]);
    // 실제 서비스에서는 여기서 API 호출 후 응답 추가
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: `"${text}"에 대한 답변입니다.` }
      ]);
    }, 600);
  };

  const [policies, setPolicies] = useState([]);
  const [selected, setSelected] = useState([]);

  // 서버에서 정책 데이터 불러오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/items`)
      .then(res => res.json())
      .then(data => {
        // 서버에서 받아온 정책 데이터에 고유 id 추가
        const policiesWithId = data.map(policy => ({
          ...policy,
          id: policy.service_id // service_id를 id로 사용
        }));
        setPolicies(policiesWithId);
      })
      .catch(err => {
        console.error('정책 데이터를 불러오는 중 오류 발생:', err);
      });
  }, []);

  const toggleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div style={{ background: "#F6F2FF", minHeight: "100vh" }}>
      <Header/>

      <div className="service-content">
        {/* 1. 챗봇 */}
        <div className="section-container">
          <div className="chatbot-popup">
            <div className="chat-body">
              <ChatMessages messages={messages} />
            </div>
            <div className="chat-footer">
              <ChatForm onSend={handleSend} />
            </div>
          </div>
        </div>

        {/* 2. 정책 리스트 */}
        <div className="section-container">
          <PolicySearch
            policies={policies}
            selected={selected}
            toggleSelect={toggleSelect}
          />
        </div>

        {/* 3. 정책 비교 */}
        <div className="section-container">
          <PolicyCompare
            policies={policies.filter((p) => selected.includes(p.id))}
            onClose={() => setSelected([])}
          />
        </div>
      </div>
    </div>

  );
}

export default App;

