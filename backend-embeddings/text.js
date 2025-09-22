require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

(async () => {
  try {
    const response = await openai.embeddings.create({
      input: 'Hola mundo',
      model: 'text-embedding-ada-002'
    });
    console.log(response.data[0].embedding);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message || error);
  }
})();
