import { useEffect, useRef } from 'react';
import React from 'react';

function MessageList({ messages, loading }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          {msg.content}
        </div>
      ))}

      {loading && <div className="message assistant">Typing...</div>}

      <div ref={bottomRef} />
    </div>
  );
}

export default React.memo(MessageList);