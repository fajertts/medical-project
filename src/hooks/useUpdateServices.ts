import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type UpdateServiceData = {
  id: number;
  title: string;
  description: string;
  image: File | null;
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      image,
    }: UpdateServiceData) => {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      // إذا اختار المستخدم صورة جديدة فقط
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.put(
        `http://localhost:3000/api/services/${id}`,
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
        queryKey: ["services"],
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(
          "UPDATE SERVICE STATUS:",
          error.response?.status
        );

        console.log(
          "UPDATE SERVICE RESPONSE:",
          error.response?.data
        );
      } else {
        console.error(error);
      }
    },
  });
};