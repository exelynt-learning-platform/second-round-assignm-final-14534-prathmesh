// controllers/chatController.js
const { getChatResponse } = require("../services/geminiAIService");

const chatWithAI = async (req, res, next) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
  return res.status(400).json({
    message: "Invalid messages format",
  });
}
    const aiMessage = await getChatResponse(messages);

    res.json(aiMessage);
  } catch (err) {
    next(err);
  }
};

module.exports = { chatWithAI };