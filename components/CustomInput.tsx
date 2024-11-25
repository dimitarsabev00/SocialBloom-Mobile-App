import React, { RefObject } from "react";
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

interface CustomInputProps extends TextInputProps {
  containerStyle?: ViewStyle; 
  icon?: React.ReactNode; 
  inputRef?: RefObject<TextInput>; 
}

const CustomInput: React.FC<CustomInputProps> = ({
  containerStyle,
  icon,
  inputRef,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.textLight}
        ref={inputRef}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
});

export default CustomInput;
