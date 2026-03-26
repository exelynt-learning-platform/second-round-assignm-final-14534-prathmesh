import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages,
    });

    res.json(response.choices[0].message);
  } catch (error) {
    console.error(error);

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ error: 'Invalid API Key' });
    }

    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});