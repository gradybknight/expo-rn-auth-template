import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firefbase from "firebase";
import { firebaseConfig } from "./Model/firebase";
import LoginScreen from "./View/Screens/LoginScreen";

firefbase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
