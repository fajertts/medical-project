import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDoctor = (
  id: string | undefined
) => {
  return useQuery({
    queryKey: ["doctor", id],

    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/doctors/${id}`
      );

      return response.data;
    },

    enabled: !!id,
  });
};