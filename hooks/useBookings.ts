import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serverAPi } from "@/constants/Url";
import { Booking } from "@/types/booking.types";

export const useBookings = () => {
  return useMutation({
    mutationFn: async ({
      propertyId,
      userId,
      checkIn,
      checkOut,
    }: {
      propertyId: string;
      userId: string;
      checkIn: string;
      checkOut: string;
    }) => {
      return axios.post(`${serverAPi}/bookings`, {
        propertyId,
        userId,
        checkIn: checkIn ?? new Date().toISOString().split("T")[0],
        checkOut:
          checkOut ??
          new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0], // 3 days later
        status: Math.ceil(Math.random() * 10) >= 7 ? "Pending" : "Confirmed",
      });
    },
    onSuccess: () => {
      alert("Booking confirmed!");
    },
    onError: (error: any) => {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    },
  });
};

export const getBookings = (userId: string | null) => {
  return useQuery<Booking[]>({
    queryKey: ["bookings", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await axios.get(
        `${serverAPi}/bookings?userId=${userId}`
      );
      return data;
    },
  });
};
