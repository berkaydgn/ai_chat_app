const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Gemini API 
const GEMINI_URL = `${process.env.GEMINI_BASE_URL}/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini did not respond.';
    res.json({ reply: aiReply });

  } catch (error) {
    console.error('Gemini API error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    res.status(500).send('Error communicating with Gemini AI');
  }
});

module.exports = router;
