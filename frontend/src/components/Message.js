import React from "react";

const Message = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`d-flex mb-2 ${
        isUser ? "justify-content-start" : "justify-content-end"
      }`}
    >
      <div
        className={`p-2 rounded ${
          isUser ? "bg-primary text-white" : "bg-white border"
        }`}
        style={{
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
      >
        {message.content}
      </div>
    </div>
  );
};

export default React.memo(Message);