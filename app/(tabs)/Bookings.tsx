import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "@/components/Themed";
import { getBookings } from "@/hooks/useBookings";
import { getProperties } from "@/hooks/getProperties";
import { useAppStore } from "@/stores/useAppStore";
import { SafeView } from "@/components/StyledComponents/StyledView";
import BookingList from "@/components/Bookings/bookingList";

export default function Bookings() {
  const userId = useAppStore((s) => s.user?.id ?? null);

  const { data: bookings = [], isLoading, error } = getBookings(userId);
  const { data: properties = [] } = getProperties();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50 px-4">
        <Text className="text-center text-base text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50 px-4">
        <Text className="text-red-500 text-center">
          Failed to load bookings
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeView>
      <View className="mb-4 mx-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <Text className="text-xl font-bold text-black text-center">
          My Bookings
        </Text>
      </View>

      <BookingList properties={properties} bookings={bookings} />
    </SafeView>
  );
}
