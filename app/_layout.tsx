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
    // Monitor auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Session:", session?.user?.id);

        if (session) {
          setAuth(session.user);
          updateUserData(session?.user); // update user like image, phone, bio
          router.replace("/(main)/home");
        } else {
          setAuth(null);
          router.replace("/(auth)/welcome");
        }
      }
    );

    // Cleanup the subscription
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
