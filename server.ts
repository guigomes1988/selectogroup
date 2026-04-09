import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(express.json());

// Neon Postgres Connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Auth Middleware Local
const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) return res.status(401).json({ error: 'Não autorizado' });

  const auth = authHeader.split(' ')[1];
  const [email, password] = Buffer.from(auth, 'base64').toString().split(':');

  try {
    const adminResult = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = adminResult.rows[0];

    if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
      return res.status(403).json({ error: 'Credenciais inválidas' });
    }
    
    (req as any).admin = admin;
    next();
  } catch (error) {
    console.error('Erro de autenticação detalhado:', error);
    res.status(500).json({ error: 'Erro de autenticação no servidor' });
  }
};

// Endpoints
app.post('/api/leads', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nome e email são obrigatórios.' });

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

// Admin Leads Endpoints
app.get('/api/admin/leads', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

app.delete('/api/admin/leads', authenticate, async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir lead' });
  }
});

// Admin Users Endpoints
app.get('/api/admin/users', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, created_at FROM admins ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/api/admin/users', authenticate, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email e senha obrigatórios' });

  try {
    const hash = bcrypt.hashSync(password, 10);
    await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [email, hash]);
    res.status(201).json({ success: true });
  } catch (error: any) {
    if (error.code === '23505') return res.status(400).json({ error: 'Email já cadastrado' });
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.delete('/api/admin/users', authenticate, async (req, res) => {
  try {
    const { id } = req.query;
    if (Number(id) === (req as any).admin.id) return res.status(400).json({ error: 'Você não pode se deletar' });
    
    await pool.query('DELETE FROM admins WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

// Admin Auth Verification
app.get('/api/admin/auth', authenticate, (req, res) => {
  res.json({ success: true, email: (req as any).admin.email });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
