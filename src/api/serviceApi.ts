export const getServices = async () => {
  const response = await fetch(
    "http://localhost:3000/api/services"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
};