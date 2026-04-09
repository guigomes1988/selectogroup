import type { VercelRequest, VercelResponse } from '@vercel.node';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Verificação de Autenticação
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const auth = authHeader.split(' ')[1];
  const [email, password] = Buffer.from(auth, 'base64').toString().split(':');

  try {
    const adminResult = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = adminResult.rows[0];

    if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
      return res.status(403).json({ error: 'Credenciais inválidas' });
    }

    return res.status(200).json({ success: true, email: admin.email });
  } catch (error) {
    console.error('Erro na API Auth:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
