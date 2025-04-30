const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Hugging face API URL for model inference 
const HUGGING_FACE_API_URL = process.env.HUGGING_FACE_API_URL
const API_KEY = process.env.HUGGING_FACE_API_KEY

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    // Make a POST request to Huggingface API
    const response = await axios.post(
        HUGGING_FACE_API_URL,
        {
            inputs: message,
        },
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    // Extract the model's response and send it back to the client
    const aiReply = response.data[0]?.generated_text || 'Sorry, no response from AI.';
    res.json({reply: aiReply});
    
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).send('Error communicating with Hugging Face AI');
  }
});

module.exports = router;
