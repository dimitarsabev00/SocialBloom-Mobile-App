import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";

interface BackButtonProps {
  router: { back: () => void }; // Define the expected shape of the `router` prop
  size?: number; // Optional size prop
}

const BackButton: React.FC<BackButtonProps> = ({ router, size = 26 }) => {
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Icon
        name="arrowLeft"
        strokeWidth={2.5}
        size={size}
        color={theme.colors.text}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});

export default BackButton;
