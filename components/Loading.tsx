import { View, ActivityIndicator, ActivityIndicatorProps } from "react-native";
import React from "react";
import { theme } from "../constants/theme";

type LoadingProps = {
  size?: ActivityIndicatorProps['size']; // Accept 'small' | 'large' (or a number, but that's platform-specific)
  color?: string; // Color of the ActivityIndicator
};

const Loading: React.FC<LoadingProps> = ({
  size = "large",
  color = theme.colors.primary,
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;