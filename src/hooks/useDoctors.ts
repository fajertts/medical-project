import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  image: string;
  days: string[];
  times: string[];
}

const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await axios.get(
    "http://localhost:3000/api/doctors"
  );

  return data;
};

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
};