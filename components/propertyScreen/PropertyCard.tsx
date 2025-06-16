// components/PropertyCard.tsx
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../Themed";
import { useState } from "react";
import { Property } from "@/types/property.types";

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  const handlePress = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    router.push(`/property/${property.id}`);
    setTimeout(() => setIsNavigating(false), 1000); // prevent re-tap for 1 second
  };
  return (
    <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
      {/* Scrollable images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-2 rounded-xl"
      >
        {property.images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            className="w-64 h-40 rounded-xl mr-2"
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Touchable lower content */}
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <View>
          <Text className="text-xl font-bold text-black mb-1">
            {property.title}
          </Text>
          <Text className="text-gray-600 mb-1">${property.price} / month</Text>
          <Text className="text-gray-500 mb-2">
            {property.location.address}, {property.location.city},{" "}
            {property.location.state}
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {property.features.map((feature, idx) => (
              <Text
                key={idx}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
              >
                {feature}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
