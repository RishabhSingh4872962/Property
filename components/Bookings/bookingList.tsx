import { View, Text, FlatList } from "react-native";
import React from "react";
import { Booking } from "@/types/booking.types";
import { Property } from "@/types/property.types";

const BookingList: React.FC<{
  bookings: Booking[];
  properties: Property[];
}> = ({ bookings, properties }) => {
  return (
    <View className="flex-1">
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const property = properties?.find((p) => p.id === item.propertyId);
          const status = item.status?.toLowerCase();

          
          return (
            <View className="mb-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              <Text className="text-lg font-semibold text-black">
                {property?.title ?? "Unknown Property"}
              </Text>
              <Text className="text-gray-600">
                {item.checkIn} → {item.checkOut}
              </Text>
              <Text
                className={`mt-1 text-sm font-medium ${
                  status === "confirmed" ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {item.status}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No bookings found.
          </Text>
        }
      />
    </View>
  );
};

export default BookingList;
