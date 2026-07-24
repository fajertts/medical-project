import pool from "../config/db";

export const getAdminByUsername = async (username: string) => {
  const result = await pool.query(
    "SELECT * FROM admins WHERE username = $1",
    [username]
  );

  return result.rows[0];
};