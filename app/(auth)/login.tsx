import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import BackButton from "../../components/BackButton";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../lib/supabase";
import Icon from "../../assets/icons";
import CustomInput from "../../components/CustomInput";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if(!emailRef.current || !passwordRef.current){
        Alert.alert('Login', "Please fill all the fields!");
        return;
    }
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert('Login', error.message)
    setLoading(false)
    setLoading(true);
    
  };

  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View>
          <BackButton router={router} />
        </View>

        <View>
          <Text style={styles.welcomeText}>Hey, </Text>
          <Text style={styles.welcomeText}>Welcome Back </Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please login to continue
          </Text>
          <CustomInput
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (emailRef.current = value)}
          />
          <CustomInput
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <CustomButton title="Login" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.navigate("/signUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});

export default Login;
