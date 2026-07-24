export const getDoctors = async () => {
  const response = await fetch(
    "http://localhost:3000/api/doctors"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
};