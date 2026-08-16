import pool from "../config/db";

// ==========================================
// GET ALL SERVICES
// ==========================================

export const getAllServices = async () => {
  const result = await pool.query(
    "SELECT * FROM services ORDER BY id ASC"
  );

  return result.rows;
};

// ==========================================
// GET SERVICE BY ID
// ==========================================

export const getServiceByIdService = async (
  id: number
) => {
  const result = await pool.query(
    "SELECT * FROM services WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// ==========================================
// CREATE SERVICE
// ==========================================

export const createService = async (
  title: string,
  description: string,
  image: string
) => {
  const result = await pool.query(
    `
      INSERT INTO services
      (title, description, image)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [title, description, image]
  );

  return result.rows[0];
};

// ==========================================
// UPDATE SERVICE
// ==========================================

export const updateServiceById = async (
  id: number,
  title: string,
  description: string,
  image: string
) => {
  const result = await pool.query(
    `
      UPDATE services
      SET
        title = $1,
        description = $2,
        image = $3
      WHERE id = $4
      RETURNING *
    `,
    [
      title,
      description,
      image,
      id,
    ]
  );

  return result.rows[0];
};

// ==========================================
// DELETE SERVICE
// ==========================================

export const deleteServiceById = async (
  id: number
) => {
  await pool.query(
    "DELETE FROM services WHERE id = $1",
    [id]
  );
};