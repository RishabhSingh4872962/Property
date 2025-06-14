import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";

export default function Profile() {
  return (
    <View>
      <Text style={styles.title}>Profile Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
