import { useState } from "react";

const MessageInput = ({ onSend, loading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="p-2 border-top d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        className="btn btn-primary"
        onClick={handleSend}
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;