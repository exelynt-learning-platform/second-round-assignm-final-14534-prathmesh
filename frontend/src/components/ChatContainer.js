import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/chat/chatThunks";
import { addUserMessage, clearError, setLastMessages} from "../features/chat/chatSlice";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useCallback } from "react";
import './ChatContainer.css'

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, loading, error, lastMessages } = useSelector((state) => state.chat);

  const handleSend = useCallback((text) => {
    if (!text.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: text }];
    dispatch(clearError());
    dispatch(setLastMessages(updatedMessages));
    dispatch(addUserMessage(text));
    dispatch(sendMessage(updatedMessages));
  }, [messages, dispatch]);

  const handleRetry = () => {
    console.log(lastMessages);
  if (lastMessages) {
    
    dispatch(sendMessage(lastMessages));
  }
};

  return (
    <>
    
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <div className="bg-dark text-white p-3 text-center">
        <h4>ChatBox</h4>
      </div>

      <MessageList messages={messages} loading={loading} error={error}>
        {error && (<div className="card m-auto popup p-3">{error} 
     <button className="btn btn-warning btn-xsm btn-sm m-2" onClick={ ()=>dispatch(clearError())} disabled={loading}>
            Ok
            </button>
    </div>)}
      </MessageList>
      {/* {error && <div className="text-danger text-center">{error}</div>} */}
        {error && (
        <div className="text-center text-danger">
            <p>{error}</p>
            <button className="btn btn-warning btn-sm m-1" onClick={handleRetry} disabled={loading}>
            Retry
            </button>
        </div>
        )}
      <MessageInput onSend={handleSend} loading={loading} />
    </div>
    </>
  );
};

export default ChatContainer;