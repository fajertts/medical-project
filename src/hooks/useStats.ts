import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Stats = {
  doctors: number;
  services: number;
  appointments: number;
  patients: number;
};

export const useStats = () => {
  return useQuery<Stats>({
    queryKey: ["stats"],

    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/stats"
      );

      return data;
    },

    staleTime: 1000 * 60 * 5,
  });
};