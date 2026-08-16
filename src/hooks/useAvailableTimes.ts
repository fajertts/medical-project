import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAvailableTimes = (
  doctorId: number | null,
  date: string
) => {
  return useQuery({
    queryKey: ["available-times", doctorId, date],

    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/appointments/available",
        {
          params: {
            doctorId,
            date,
          },
        }
      );

      return data as string[];
    },

    enabled: !!doctorId && !!date,
  });
};