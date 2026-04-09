import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Neon Postgres Connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test Database Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Banco de dados Neon conectado com sucesso!');
  release();
});

// Endpoints
app.post('/api/leads', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO leads (name, email, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, message];
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    res.status(500).json({ error: 'Erro interno ao salvar os dados.' });
  }
});

// Admin Endpoints
app.get('/api/admin/leads', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Não autorizado' });

  const auth = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(auth, 'base64').toString().split(':');

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return res.status(403).json({ error: 'Credenciais inválidas' });
  }

  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

app.delete('/api/admin/leads', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Não autorizado' });

  const auth = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(auth, 'base64').toString().split(':');

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return res.status(403).json({ error: 'Credenciais inválidas' });
  }

  try {
    const { id } = req.query;
    await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir lead' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
