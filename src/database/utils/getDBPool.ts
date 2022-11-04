import { Pool } from 'pg';

const PGUSER = process.env.PGUSER;
const PGHOST = process.env.PGHOST;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;
const PGPORT = +process.env.PGPORT;

export default async () => {
  const pool = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
  });

  const client = await pool.connect();
  return { pool, client };
}