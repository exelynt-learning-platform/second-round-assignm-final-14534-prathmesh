import React from "react";

function MessageInput({ input, setInput, onSend, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="input-container">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
      />

      <button onClick={onSend} disabled={loading}>
        Send
      </button>
    </div>
  );
}

export default React.memo(MessageInput);