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
  const [authEmail, authPassword] = Buffer.from(auth, 'base64').toString().split(':');

  try {
    const adminResult = await pool.query('SELECT * FROM admins WHERE email = $1', [authEmail]);
    const admin = adminResult.rows[0];

    if (!admin || !bcrypt.compareSync(authPassword, admin.password_hash)) {
      return res.status(403).json({ error: 'Credenciais inválidas' });
    }

    // Listar usuários
    if (req.method === 'GET') {
      const result = await pool.query('SELECT id, email, created_at FROM admins ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    // Criar novo usuário
    if (req.method === 'POST') {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });

      const hash = bcrypt.hashSync(password, 10);
      await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [email, hash]);
      return res.status(201).json({ success: true, message: 'Usuário criado com sucesso' });
    }

    // Excluir usuário
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID necessário' });

      // Impedir que o usuário se autodelete (opcional, mas seguro)
      if (Number(id) === admin.id) {
        return res.status(400).json({ error: 'Você não pode excluir o seu próprio acesso' });
      }

      await pool.query('DELETE FROM admins WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
    }
    console.error('Erro na API Admin Users:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
