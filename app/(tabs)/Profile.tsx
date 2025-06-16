import { View, FlatList } from "react-native";
import { Text } from "@/components/Themed";
import { useProfile } from "@/hooks/useProfiles";
import { getBookings } from "@/hooks/useBookings";
import { getProperties } from "@/hooks/getProperties";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingList from "@/components/Bookings/bookingList";

export default function Profile() {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: bookings = [] } = getBookings(profile?.id ?? "");
  const { data: properties = [] } = getProperties();

  if (loadingProfile) {
    return <Text className="text-center mt-10">Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-2 text-black">Profile</Text>
        <Text className="text-base text-gray-700">Name: {profile.name}</Text>
        <Text className="text-base text-gray-700 mb-4">
          Email: {profile.email}
        </Text>

        <Text className="text-xl font-semibold mb-2 text-black">
          My Bookings
        </Text>

        <BookingList bookings={bookings} properties={properties} />
      </View>
    </SafeAreaView>
  );
}
