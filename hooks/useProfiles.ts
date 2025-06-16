import { serverAPi } from "@/constants/Url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axios.get(`${serverAPi}/profile`); // use your actual IP, not localhost on physical device
      return data;
    },
  });
};
