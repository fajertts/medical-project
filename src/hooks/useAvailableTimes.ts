import { useQuery } from "@tanstack/react-query";
import { getAvailableTimes } from "../api/appointmentApi";

export const useAvailableTimes = (
  doctorId: number,
  date: string
) => {
  return useQuery({
    queryKey: ["available-times", doctorId, date],
    queryFn: () => getAvailableTimes(doctorId, date),
    enabled: doctorId > 0 && date !== "",
  });
};