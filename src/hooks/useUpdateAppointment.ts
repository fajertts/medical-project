import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type UpdateAppointmentData = {
  id: number;
  patient_name: string;
  phone: string;
  doctor_id: number;
  service_id: number;
  appointment_date: string;
  appointment_time: string;
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: UpdateAppointmentData) => {
      const response = await axios.put(
        `http://localhost:3000/api/appointments/${id}`,
        data
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
};