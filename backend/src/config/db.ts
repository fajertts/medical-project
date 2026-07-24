import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Medicaldb",
  password: "ahedahed123",
  port: 5432,
});

export default pool;