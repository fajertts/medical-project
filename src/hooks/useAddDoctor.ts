import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DoctorData {
  name: string;
  specialization: string;
  image: string;
  days: string[];
  times: string[];
}

export const useAddDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (doctor: DoctorData) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:3000/api/doctors",
        doctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
      } else {
        console.log(error);
      }
    },
  });
};