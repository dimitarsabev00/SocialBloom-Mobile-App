import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { hp } from "../../helpers/common";
import { useAuth } from "../../contexts/AuthContext";
import { theme } from "../../constants/theme";
import { router } from "expo-router";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import { supabase } from "../../lib/supabase";

const Profile = () => {
  const { user, setAuth } = useAuth();

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure you want log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <UserHeader user={user} handleLogout={handleLogout} router={router} />
    </ScreenWrapper>
  );
};

interface User {
  image?: string;
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
}

interface UserHeaderProps {
  user: User; // Defines the user object structure
  handleLogout: () => void; // Function for handling logout
  router: {
    push: (path: string) => void; // Router object with a push method
  };
}

const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  handleLogout,
  router,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", marginHorizontal: 10 }}>
      <View>
        <Header title="Profile" mb={30} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={26} color={theme.colors.rose} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          {/* avatar */}
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => router.push("/(main)/editProfile")}
            >
              <Icon name="edit" strokeWidth={2.5} size={20} />
            </Pressable>
          </View>

          {/* username & address */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}> {user && user.name} </Text>
            <Text style={styles.infoText}> {user && user.address} </Text>
          </View>

          {/* email, phone */}
          <View style={{ gap: 10 }}>
            <View style={styles.info}>
              <Icon name="mail" size={20} color={theme.colors.textLight} />
              <Text style={[styles.infoText, { fontSize: hp(1.8) }]}>
                {user && user.email}
              </Text>
            </View>
            {user && user.phoneNumber && (
              <View style={styles.info}>
                <Icon name="call" size={20} color={theme.colors.textLight} />
                <Text style={[styles.infoText, { fontSize: hp(1.8) }]}>
                  {user.phoneNumber}
                </Text>
              </View>
            )}

            {user && user.bio && (
              <Text style={[styles.infoText]}>{user.bio}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textLight,
  },

  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "#fee2e2",
  },
});

export default Profile;
