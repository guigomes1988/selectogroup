import type { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Habilitar CORS para o frontend da Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, message } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO leads (name, email, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, message];
    const result = await pool.query(query, values);
    
    return res.status(201).json({ 
      success: true, 
      message: 'Contato recebido com sucesso!',
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar os dados.' });
  }
}
