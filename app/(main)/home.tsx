import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { setAuth } = useAuth();

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  };

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <CustomButton onPress={onLogout} title="Logout" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
