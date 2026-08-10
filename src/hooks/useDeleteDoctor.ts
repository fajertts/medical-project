import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:3000/api/doctors/${id}`,
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