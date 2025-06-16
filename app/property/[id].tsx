import { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "@/components/Themed";
import { getProperties } from "@/hooks/getProperties";
import { useAppStore } from "@/stores/useAppStore";
import { useBookings } from "@/hooks/useBookings";

export default function PropertyDetail() {
  const { id } = useLocalSearchParams();
  const { data } = getProperties();
  const property = data?.find((p) => p.id === id);

  const [book, setBook] = useState("Book Now");
  const [modalVisible, setModalVisible] = useState(false);

  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const userId = useAppStore((s) => s.user?.id ?? null);
  const { mutate: bookNow, isSuccess } = useBookings();

  useEffect(() => {
    if (isSuccess) {
      setBook("Booked!");
      setModalVisible(false);
    }
  }, [isSuccess]);

  const handleConfirmBooking = () => {
    if (!userId || !property?.id) return alert("User not logged in");

    bookNow({
      propertyId: property.id,
      userId,
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
    });
  };

  const onBook = () => {
    if (!userId || !property?.id) return alert("User not logged in");
    setModalVisible(true);
  };

  if (!property) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-500">Property not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-6 pb-2 border-b border-gray-100">
          <Text className="text-2xl font-extrabold text-black">
            {property.title}
          </Text>
          <Text className="text-base text-gray-600 mt-1">
            {property.location.address}, {property.location.city},{" "}
            {property.location.state}
          </Text>
          <Text className="text-xl font-bold text-green-600 mt-3">
            ₹{property.price} / month
          </Text>
        </View>

        {/* Map */}
        <MapView
          className="h-64 w-full mt-4"
          region={{
            latitude: property.location.coordinates.latitude,
            longitude: property.location.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={property.location.coordinates}
            title={property.title}
            description={property.location.address}
          />
        </MapView>

        {/* Features */}
        <View className="px-4 py-6 border-t border-gray-100">
          <Text className="text-xl font-semibold text-black mb-3">
            Features
          </Text>
          {property.features.map((feature, index) => (
            <Text key={index} className="text-base text-gray-700 mb-1">
              • {feature}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Buttons */}
      <View className="px-4 pb-6 space-y-3">
        <TouchableOpacity
          onPress={() => router.replace("/Bookings")}
          className="bg-white border border-green-600 rounded-xl py-4 shadow-md"
        >
          <Text className="text-center text-green-600 text-lg font-bold">
            Check Your Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={book === "Booked!"}
          onPress={onBook}
          className={`rounded-xl py-4 shadow-md ${
            book === "Booked!" ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          <Text className="text-white text-center text-lg font-bold">
            {book}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white px-6 pt-6 pb-8 rounded-t-3xl">
            <Text className="text-xl font-bold text-black mb-3">
              Select Check-In
            </Text>
            <TouchableOpacity
              className="p-3 border border-gray-300 rounded-lg bg-gray-50"
              onPress={() => setShowCheckIn(true)}
            >
              <Text className="text-base text-gray-800">
                {checkIn.toDateString()}
              </Text>
            </TouchableOpacity>
            {showCheckIn && (
              <DateTimePicker
                value={checkIn}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowCheckIn(false);
                  if (selectedDate) setCheckIn(selectedDate);
                }}
              />
            )}

            <Text className="text-xl font-bold text-black mt-6 mb-3">
              Select Check-Out
            </Text>
            <TouchableOpacity
              className="p-3 border border-gray-300 rounded-lg bg-gray-50"
              onPress={() => setShowCheckOut(true)}
            >
              <Text className="text-base text-gray-800">
                {checkOut.toDateString()}
              </Text>
            </TouchableOpacity>
            {showCheckOut && (
              <DateTimePicker
                value={checkOut}
                mode="date"
                display="default"
                minimumDate={checkIn}
                onChange={(event, selectedDate) => {
                  setShowCheckOut(false);
                  if (selectedDate) setCheckOut(selectedDate);
                }}
              />
            )}

            {/* Buttons */}
            <View className="mt-6 flex-row space-x-4">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-gray-200 rounded-lg py-3"
              >
                <Text className="text-center text-black font-medium">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleConfirmBooking}
                className="flex-1 bg-green-600 rounded-lg py-3"
              >
                <Text className="text-center text-white font-medium">
                  Confirm Booking
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
