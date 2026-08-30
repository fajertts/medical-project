import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],

    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/doctors"
      );

      return response.data;
    },

    staleTime: 1000 * 60 * 5,
  });
};