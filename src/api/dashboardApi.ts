import axios from "axios";

export const getDashboardStats = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/api/dashboard"
  );

  return data;
};