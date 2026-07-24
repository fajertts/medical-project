import pool from "../config/db";

export const getAllServices = async () => {
  const result = await pool.query("SELECT * FROM services ORDER BY id ASC");

  return result.rows;
};
export const createService = async (
  title: string,
  description: string,
  image: string,
) => {
  const result = await pool.query(
    `
    INSERT INTO services (title, description, image)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [title, description, image],
  );

  return result.rows[0];
};
export const getServiceById = async (id: number) => {
  const result = await pool.query("SELECT * FROM services WHERE id = $1", [id]);

  return result.rows[0];
};
export const updateService = async (
  id: number,
  title: string,
  description: string,
  image: string,
) => {
  const result = await pool.query(
    `
    UPDATE services
    SET title = $1,
        description = $2,
        image = $3
    WHERE id = $4
    RETURNING *;
    `,
    [title, description, image, id],
  );

  return result.rows[0];
};

export const deleteService = async (
  id: number,
  title: string,
  description: string,
  image: string,
) => {
  const result = await pool.query(
    `
    DELETE FROM services
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  return result.rows[0];
};
