import { SafeAreaView } from "react-native-safe-area-context";
import React, { ReactNode } from "react";

type SafeViewProps = {
  children: ReactNode;
};

export const SafeView = ({ children }: SafeViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">{children}</SafeAreaView>
  );
};
