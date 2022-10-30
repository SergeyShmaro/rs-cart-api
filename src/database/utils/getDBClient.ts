import { Client } from 'pg';

const PGUSER = process.env.PGUSER;
const PGHOST = process.env.PGHOST;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;
const PGPORT = +process.env.PGPORT;

export default async () => {
  console.log('beforeConnect');
  const client = new Client({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
  });

  await client.connect();
  console.log('afterConnect');

  return client;
}