require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

console.log('API Key:', process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/embedding', async (req, res) => {
  const { texto } = req.body;

  try {
    const response = await openai.embeddings.create({
      input: texto,
      model: 'text-embedding-ada-002'
    });

    const vector = response.data[0].embedding;
    res.json({ embedding: vector });
  }  catch (error) {
  console.error('Error completo:', error.response?.data || error.message || error);
  res.status(500).json({ error: 'Error al generar embedding'});
}
});

app.listen(3000, () => console.log('Servidor embeddings en http://localhost:3000'));
