import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, sendMessage } from '../features/chat/chatSlice';
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatContainer() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.chat.messages);
const loading = useSelector((state) => state.chat.loading);
const error = useSelector((state) => state.chat.error);

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(addUserMessage(input));
    dispatch(sendMessage());
    setInput('');
  };

  return (
    <div className="chat-wrapper">
      <MessageList messages={messages} loading={loading} />
      
      {error && <div className="error">⚠️ {error}</div>}

      <MessageInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}