import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/serviceApi";
import axios from "axios";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};
