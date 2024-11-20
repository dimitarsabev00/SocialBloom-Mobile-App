import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import BackButton from "./BackButton";

interface HeaderProps {
  title?: string; // Title is optional, default is an empty string
  showBackButton?: boolean; // Optional, defaults to true
  mb?: number; // Optional, default is 10
}

const Header: React.FC<HeaderProps> = ({
  title = "",
  showBackButton = true,
  mb = 10,
}) => {
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: "600",
    color: theme.colors.textDark,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
});

export default Header;
