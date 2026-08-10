import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DoctorData {
  id: number;
  name: string;
  specialization: string;
  image?: File | null;
}

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (doctor: DoctorData) => {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", doctor.name);
      formData.append("specialization", doctor.specialization);

      if (doctor.image) {
        formData.append("image", doctor.image);
      }

      const { data } = await axios.put(
        `http://localhost:3000/api/doctors/${doctor.id}`,
        formData,
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
  });
};