// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Necesario para Supabase
});

app.post('/api/login', async (req, res) => {
  const { username, password_hash } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1 AND password_hash = $2',
      [username, password_hash]
    );
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));