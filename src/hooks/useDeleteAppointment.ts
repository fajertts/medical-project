import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "axios";

export const useDeleteAppointment = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      id: number
    ) => {
      const { data } =
        await axios.delete(
          `http://localhost:3000/api/appointments/${id}`
        );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
};