import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

function TabBarIcon({ name, color }: { name: string; color: string }) {
  return <Ionicons name={name as any} size={24} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
