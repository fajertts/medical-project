import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const getServices = async () => {
  const response = await axios.get(
        "http://localhost:3000/api/services"
      );

      return response.data;
}; 



