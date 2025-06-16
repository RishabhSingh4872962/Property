import { useState, useCallback, useEffect } from "react";
import { FlatList, RefreshControl, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/Themed";
import PropertyCard from "@/components/propertyScreen/PropertyCard";
import { getProperties } from "@/hooks/getProperties";
import { useProfile } from "@/hooks/useProfiles";
import { useAppStore } from "@/stores/useAppStore";

export default function Home() {
  const setUser = useAppStore((s) => s.setUser);
  const setError = useAppStore((s) => s.setError);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isLoading, error } = getProperties();
  const { data: userProfile, error: profileError } = useProfile();

  useEffect(() => {
    if (userProfile) setUser(userProfile);
    if (profileError) setError(profileError);
  }, [userProfile, profileError]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const filteredData = data?.filter(
    (property) =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.city.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <Text className="text-center mt-10">Loading...</Text>;
  }

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-10">
        Failed to load properties
      </Text>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      <TextInput
        className="bg-white rounded-xl p-3 mb-4 border border-gray-200"
        placeholder="Search by title or city"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PropertyCard property={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No properties found.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
