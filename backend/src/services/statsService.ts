import pool from "../config/db";

export const getStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM doctors) AS doctors,
      (SELECT COUNT(*) FROM services) AS services,
      (SELECT COUNT(*) FROM appointments) AS appointments,
      (
        SELECT COUNT(DISTINCT COALESCE(email, phone))
        FROM appointments
        WHERE email IS NOT NULL
           OR phone IS NOT NULL
      ) AS patients
  `);

  return result.rows[0];
};