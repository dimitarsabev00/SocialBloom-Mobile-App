import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/userService";

const RootLayout = () => {
  return (
    <AuthProvider>
      <InnerRootLayout />
    </AuthProvider>
  );
};

const InnerRootLayout = () => {
  const { setAuth, setUserData } = useAuth();

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuth(session.user);
          updateUserData(session?.user);
          router.replace("/(main)/home");
        } else {
          setAuth(null);
          router.replace("/(auth)/welcome");
        }
      }
    );

    return subscription;
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user.id);
    if (res.success) setUserData(res.data);
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

export default RootLayout;
