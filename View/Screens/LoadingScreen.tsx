import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

const LoadingScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // logged in
        // nav to dashboard
        console.log(`success ${user}`);
      } else {
        // failed
        // nav to login
        console.log("no login");
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text>LoadingScreen</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
