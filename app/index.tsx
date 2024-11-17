import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const IndexPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text
          style={styles.subtitle}
          onPress={() => {
            router.push("welcome");
          }}
        >
          This is the first page of your app. CLICK HERE
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

export default IndexPage;
