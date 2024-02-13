// Essa biblioteca abre o arquivo '.env', lê as variáveis de ambiente desse arquivo
// e salva em uma variável global do node, chamada 'process.env'.
import 'dotenv/config'
import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});