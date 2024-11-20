import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { Image } from "expo-image";
import { getUserImageSrc } from "@/services/imageService";

interface AvatarProps {
  uri: string; // URI must be a string
  size?: number; // Optional, defaults to hp(4.5)
  rounded?: number; // Optional, defaults to theme.radius.md
  style?: StyleProp<ViewStyle>; // Style can be a React Native style object
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {},
}) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});

export default Avatar;
