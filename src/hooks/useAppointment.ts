import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],

    queryFn: async () => {
      const { data } =
        await axios.get(
          "http://localhost:3000/api/appointments"
        );

      return data;
    },

    staleTime: 1000 * 60 * 5,
  });
};