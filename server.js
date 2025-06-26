// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/claude', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/complete',
      {
        prompt,
        model: 'claude-2',
        max_tokens_to_sample: 500
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'content-type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      }
    );

    res.json({ output: response.data.completion });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Claude API call failed' });
  }
});

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
