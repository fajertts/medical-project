import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../api/appointmentApi";

export const useAppointment = () => {
  return useMutation({
    mutationFn: createAppointment,
  });
};