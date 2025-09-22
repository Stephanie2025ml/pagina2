require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { CohereClient } = require('cohere-ai');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Instancia de Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Instancia de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // usa la clave secreta para RPC
);

// 🧠 Endpoint para generar embeddings
app.post('/embedding', async (req, res) => {
  const { texto } = req.body;

  try {
    const response = await cohere.embed({
      texts: [texto],
      model: 'embed-english-light-v2.0', // usa el modelo compatible con vector(1536)
    });

    const vector = response.embeddings[0];
    res.json({ embedding: vector });
  } catch (error) {
    console.error('Error al generar embedding:', error.message || error);
    res.status(500).json({ error: 'Error al generar embedding' });
  }
});

// 🔍 Endpoint para búsqueda semántica
app.post('/buscar', async (req, res) => {
  const { consulta } = req.body;

  try {
    const response = await cohere.embed({
      texts: [consulta],
      model: 'embed-english-light-v2.0',
    });

    const embedding = response.embeddings[0];

    const { data, error } = await supabase.rpc('buscar_articulos_similares', {
      query_embedding: embedding,
      match_count: 5
    });

    if (error) {
      console.error('Error en búsqueda:', error.message);
      return res.status(500).json({ error: 'Error en búsqueda semántica' });
    }

    res.json({ resultados: data });
  } catch (err) {
    console.error('Error al generar embedding de consulta:', err.message);
    res.status(500).json({ error: 'Error al procesar la consulta' });
  }
});

app.listen(3000, () => {
  console.log('Servidor embeddings y búsqueda con Cohere en http://localhost:3000');
});
