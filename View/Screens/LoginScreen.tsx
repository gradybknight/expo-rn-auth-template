import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

const isUserEqual = (googleUser: any, firebaseUser: any) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const onSignIn = (googleUser: any) => {
  console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(() => {
          console.log("user signed in");
        })
        // .signInWithCredential(credential)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      // androidClientId: YOUR_CLIENT_ID_HERE,
      behavior: "web",
      iosClientId:
        "927971473548-9b66npje8fie8bjf5p9g0vkgohr97fu8.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Button title={"Sign In With Google"} onPress={signInWithGoogleAsync} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
