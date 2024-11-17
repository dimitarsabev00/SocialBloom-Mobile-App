import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import Loading from "./Loading";

type CustomButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>; // Optional custom style for the button
  textStyle?: StyleProp<TextStyle>; // Optional custom style for the text
  title?: string; // Optional button title
  onPress?: () => void; // Optional callback for the button press
  loading?: boolean; // Indicates if the button shows a loading indicator
  hasShadow?: boolean; // Whether the button has a shadow
};

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonStyle,
  textStyle,
  title = "",
  onPress = () => {},
  loading = false,
  hasShadow = true,
}) => {
  const shadowStyle: ViewStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { backgroundColor: "white" }]}>
        <Loading />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomButton;
