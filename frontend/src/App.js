import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "./features/chat/chatThunks";
import { addUserMessage } from "./features/chat/chatSlice";
import { useState, useRef, useEffect } from "react";

// function App() {
//   const dispatch = useDispatch();
//   const { messages, loading, error } = useSelector((state) => state.chat);

//   const [input, setInput] = useState("");
//   const bottomRef = useRef(null);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     dispatch(addUserMessage(input));
//     dispatch(sendMessage(input));
//     setInput("");
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="container-fluid vh-100 d-flex flex-column">
      
//       {/* Header */}
//       <div className="bg-dark text-white p-3 text-center">
//         <h4>AI Chat App</h4>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-grow-1 overflow-auto p-3 bg-light">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`d-flex mb-2 ${
//               msg.role === "user"
//                 ? "justify-content-start"
//                 : "justify-content-end"
//             }`}
//           >
//             <div
//               className={`p-2 rounded ${
//                 msg.role === "user"
//                   ? "bg-primary text-white"
//                   : "bg-white border"
//               }`}
//               style={{ maxWidth: "70%" }}
//             >
//               {msg.content}
//             </div>
//           </div>
//         ))}

//         {/* Loading Spinner */}
//         {loading && (
//           <div className="d-flex justify-content-end">
//             <div className="spinner-border text-secondary" role="status"></div>
//           </div>
//         )}

//         <div ref={bottomRef}></div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="text-danger text-center py-1">
//           {error}
//         </div>
//       )}

//       {/* Input Area */}
//       <div className="p-2 border-top d-flex">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//   if (e.key === "Enter") handleSend();
// }}
//         />

//         <button className="btn btn-primary"
//   onClick={handleSend}
//   disabled={loading} >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import ChatContainer from "./components/ChatContainer";

function App() {
  return <ChatContainer />;
}

export default App;