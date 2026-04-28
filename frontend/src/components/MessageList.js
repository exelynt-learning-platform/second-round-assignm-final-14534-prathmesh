import React, { useEffect, useRef } from "react";
import Message from "./Message";

const MessageList = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-grow-1 overflow-auto p-3 bg-light">
      

        {messages.map((msg, i) => (
        <Message key={i} message={msg} />
        ))}
      {/* Loading Spinner */}
         {loading && (
           <div className="d-flex justify-content-center">
             <div className="spinner-border text-secondary" role="status"></div>
           </div>
        )}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default React.memo(MessageList);