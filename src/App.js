import React, { useState, useEffect } from 'react';
import "./App.css";

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
  const [serviceIds, setServiceIds] = useState([]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
  
    // 예시: 세션 ID는 별도로 관리하거나 생성해야 합니다.
    const sessionId = "your-session-id"; 
  
    setMessages([...messages, { role: "user", text }]);
    try {
      // AI에게 질문하기
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL2}/chat/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question_text: text,
          session_id: sessionId
        })
      });
  
      const data = await response.json();
  
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          text: data.response_text, // AI의 응답
          messageId: data.message_id,
          serviceIds: data.service_ids 
        }
      ]);

      // serviceIds 저장
      setServiceIds(prev => [...prev, data.service_ids]);
      console.log("serviceIds 저장하기: ✅ 성공", serviceIds)

    } catch (error) {
      console.error("AI 응답 중 오류 발생:", error);
      setMessages(prev => [
        ...prev,
        { role: "model", text: "AI 응답 중 오류가 발생했습니다." }
      ]);
    }
  }; 

  const [policies, setPolicies] = useState([]);
  const [selected, setSelected] = useState([]);

  // service_ids 리스트에 해당하는 정책 데이터 불러오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ service_ids: serviceIds }) // service_ids 보내기
    })
      
      .then(res => res.json())
      .then(data => {
        console.log("정책 데이터 받기: ✅ 성공", data);
        const policiesWithId = data.map(policy => ({
          ...policy,
          id: policy.service_id 
        }));
        setPolicies(policiesWithId);
      })
      .catch(err => {
        console.error('정책 데이터를 불러오는 중 오류 발생:', err);
      });
  }, [serviceIds]); // serviceIds가 변경될 때마다 실행

  const toggleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div>
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

