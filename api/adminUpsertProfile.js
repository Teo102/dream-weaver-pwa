// api/adminUpsertProfile.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { id, email, display_name } = req.body;
  if (!id || !email) return res.status(400).json({ error: 'id & email required' });

  const { error } = await supabaseAdmin.from('profiles').upsert({ id, email, display_name });
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ ok: true });
};
