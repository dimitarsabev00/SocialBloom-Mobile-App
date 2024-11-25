import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: ReactNode; 
  bg?: string; 
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, bg }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={[styles.container, { paddingTop, backgroundColor: bg || "white" }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
