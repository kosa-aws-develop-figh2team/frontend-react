// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
  // const [servId, setServId] = useState('');
  // const [target, setTaget] = useState('');
  // const [content, setContent] = useState('');
  // const [period, setPeriod] = useState('');

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_SERVER_URL}/api/text`)
  //     .then(res => res.json())
  //     .then(data => {
  //       let text = data.text.split("by")[0]
  //       let author = data.text.split("by")[1]
  //       setDisplayedText(text);
  //       setDisplayedAuthor(author)
  //     });
  // }, []);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   fetch(`${process.env.REACT_APP_SERVER_URL}/api/text`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ text, username }),
  //   });
  //   setText('');
  //   setUsername('');
  // };

//   return (
//     <div className="App">
//       <h1>확신없는 랜덤 명언</h1>
//       <h2>{displayedText ? displayedText : "아직 저장된 명언이 없거나 서버와 연결되지 않았습니다."}</h2>
//       <h2>by {displayedAuthor}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter text"
//           value={text}
//           onChange={e => setText(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//         />
//         <button type="submit">명언 저장</button>
//       </form>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';

// 챗봇
import ChatHeader from "./components/ChatHeader";
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
    fetch(`${process.env.REACT_APP_SERVER_URL}/policies`)
      .then(res => res.json())
      .then(data => {
        setPolicies(data); // 서버에서 받아온 정책 데이터를 상태에 저장
      })
      .catch(err => {
        console.error('정책 데이터를 불러오는 중 오류 발생:', err);
      });
  }, []);

  // 예시 데이터
  // const [policies] = useState([
  //   { id: 1, name: "청년 주거 지원", target: "청년", content: "임대료 지원", period: "2024.01~12" },
  //   { id: 2, name: "창업 지원금", target: "예비 창업자", content: "창업 자금 지원", period: "상시" },
  //   { id: 3, name: "육아 지원", target: "부모", content: "보육료 지원", period: "2024.03~11" },
  // ]);
  // const [selected, setSelected] = useState([]);

  // 정책 선택/해제
  // const toggleSelect = (id) => {
  //   setSelected((prev) =>
  //     prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
  //   );
  // };

  const toggleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div>
    <h1>파2팀..정책찾기/비교 서비스</h1>

    <div style={{ display: "flex", justifyContent: "center", gap: 40, padding: 20 }}>
      {/* 왼쪽: 챗봇 */}
      <div className="chatbot-popup">
        <ChatHeader />
        <div className="chat-body">
          <ChatMessages messages={messages} />
        </div>
        <div className="chat-footer">
          <ChatForm onSend={handleSend} />
        </div>
      </div>

      {/* 오른쪽: 정책 검색 & 비교 */}
      <div style={{ width: 600 }}>
        <PolicySearch
          policies={policies}
          selected={selected}
          toggleSelect={toggleSelect}
        />
        <PolicyCompare
          policies={policies.filter((p) => selected.includes(p.id))}
        />
      </div>
    </div>
  </div>
  );
}

export default App;

