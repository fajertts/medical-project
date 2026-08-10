import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/services/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Service Deleted Successfully");

      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },

    onError: () => {
      toast.error("Failed To Delete Service");
    },
  });
};