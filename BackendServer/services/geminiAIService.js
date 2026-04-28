// const axios = require("axios");

// const getChatResponse = async (messages) => {
//   try {
//     const lastUserMessage = messages[messages.length - 1]?.content;

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [{ text: lastUserMessage }],
//           },
//         ],
//       }
//     );

//     const aiText =
//       response.data.candidates?.[0]?.content?.parts?.[0]?.text;

//     return {
//       role: "assistant",
//       content: aiText || "No response from AI",
//     };
//   } catch (error) {
//     console.error("Gemini Error:", error.response?.data || error.message);

//     throw new Error(
//       error.response?.data?.error?.message || "Gemini API error"
//     );
//   }
// };

// module.exports = { getChatResponse };

const axios = require("axios");

const getChatResponse = async (messages) => {
  try {
    const formattedMessages = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: formattedMessages,
      }
    );

    const aiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    return {
      role: "assistant",
      content: aiText || "No response",
    };
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);

  const status = error.response?.status;
  const apiMessage = error.response?.data?.error?.message || error.message;

  let customMessage = "Gemini API error";
  let statusCode = status || 500;

  
  if (status === 401 || apiMessage.toLowerCase().includes("api key")) {
    customMessage = "Invalid API key";
    statusCode = 401;
  }

  
  else if (status === 429) {
    if (apiMessage.toLowerCase().includes("quota")) {
      customMessage = "Quota exceeded. Please check your plan.";
      statusCode = 429; // better semantic mapping
    } else {
      customMessage = "Too many requests. Please try again later.";
      statusCode = 429;
    }
  }

 
  else if (
    status === 503 ||
    apiMessage.toLowerCase().includes("busy") ||
    apiMessage.toLowerCase().includes("overloaded")
  ) {
    customMessage = "Model is busy. Please retry.";
    statusCode = 503;
  }

  
  else if (status === 400) {
    customMessage = "Invalid request sent to AI model.";
    statusCode = 400;
  }

 
  else if (!error.response) {
    customMessage = "Network error. Please check your connection.";
    statusCode = 503;
  }

  
  else if (error.code === "ECONNABORTED") {
    customMessage = "Request timed out. Please try again.";
    statusCode = 504;
  }


  const err = new Error(customMessage);
  err.statusCode = statusCode;

  throw err;
  }
};

module.exports = { getChatResponse };