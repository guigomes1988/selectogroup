import type { VercelRequest, VercelResponse } from '@vercel.node';
import pg from 'pg';

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

  // Verificação de Autenticação (Basic Auth)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const auth = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(auth, 'base64').toString().split(':');

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return res.status(403).json({ error: 'Credenciais inválidas' });
  }

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID necessário' });

      await pool.query('DELETE FROM leads WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro na API Admin:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
