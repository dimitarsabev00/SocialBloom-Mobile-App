import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import { hp, wp } from "../../helpers/common";
import { useRouter } from "expo-router";
import { fetchPosts } from "../../services/postService";
import PostCard from "../../components/PostCard";
import { getUserData } from "../../services/userService";
import Avatar from "../../components/Avatar";

const HomeScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handlePostEvent = async (payload) => {
    console.log("got post event: ", payload);
    if (payload.eventType == "INSERT" && payload?.new?.id) {
      let newPost = { ...payload.new };
      let res = await getUserData(newPost.userId);
      newPost.user = res.success ? res.data : {};
      newPost.postLikes = []; // while adding likes
      newPost.comments = [{ count: 0 }]; // while adding comments
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  };

  useEffect(() => {
    // listen all events on a table
    let postChannel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        handlePostEvent
      )
      .subscribe();

    getPosts();

    return () => {
      supabase.removeChannel(postChannel);
    };
  }, []);

  const getPosts = async () => {
    let res = await fetchPosts();
    if (res.success) {
      setPosts(res.data);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Pressable>
            <Text style={styles.title}>SocialBloom</Text>
          </Pressable>
          <View style={styles.icons}>
            <Pressable onPress={() => {}}>
              <Icon
                name="heart"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("/(main)/newPost")}>
              <Icon
                name="plus"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("/(main)/profile")}>
              {/* Icon For User & Open User Profile From Icon  */}
              {/* <Icon
                name="user"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              /> */}

              <Avatar
                uri={user?.image}
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
          </View>
        </View>

        {/* posts */}
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard item={item} currentUser={user} />
          )}
          onEndReached={() => {
            getPosts();
            console.log("got to the end");
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold,
  },
});

export default HomeScreen;
