import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type AppointmentData = {
  patient_name: string;
  phone: string;
  doctor_id: number;
  service_id: number;
  appointment_date: string;
  appointment_time: string;
};

export const useAddAppointment = () => {
  return useMutation({
    mutationFn: async (
      appointment: AppointmentData
    ) => {
      const { data } = await axios.post(
        "http://localhost:3000/api/appointments",
        appointment
      );

      return data;
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(
          "Status:",
          error.response?.status
        );

        console.log(
          "Response:",
          error.response?.data
        );
      }
    },
  });
};