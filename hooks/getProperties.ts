// hooks/useProperties.ts
import { serverAPI } from "@/constants/Url";
import { Property } from "@/types/property.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProperties = () => {
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`${serverAPI}/properties`);
      return data;
    },
    staleTime: 1000 * 60, // cache data for 1 minute
  });
};
