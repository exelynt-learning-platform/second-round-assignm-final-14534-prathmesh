import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:3000']; // add your frontend URLs here
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());

const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requests per minute per IP
  message: 'Too many requests from this IP, please try again later'
});

app.use('/chat', chatLimiter); // apply only to chat route

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callOpenAI(messages) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or gpt-4.1-mini
      messages,
      max_tokens: 150,
    });

    return response;
  } catch (error) {
    // Comprehensive error handling
    if (error.response) {
      // OpenAI returned a valid response with error code
      switch (error.response.status) {
        case 401:
          throw new Error('Invalid API key. Please check your key.');
        case 429:
          throw new Error('Rate limit exceeded. Please slow down.');
        case 403:
          throw new Error('Quota exceeded. Check your OpenAI plan.');
        case 500:
        case 502:
        case 503:
        case 504:
          throw new Error('OpenAI service unavailable. Try again later.');
        default:
          throw new Error(`OpenAI API error: ${error.response.statusText}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from OpenAI API. Network issue?');
    } else {
      // Something else happened
      throw new Error(`OpenAI request failed: ${error.message}`);
    }
  }
}

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

     const aiResponse = await callOpenAI(messages);
    res.json(aiResponse);

    res.json(response.choices[0].message);
  }  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
