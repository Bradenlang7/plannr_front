import React, { useContext } from "react";
import { startGoogleLogin } from "../utils/startGoogleLogin";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import * as AuthSession from "expo-auth-session";

export default function SignInScreen() {
  const { state, signin } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <Text style={styles.title}>SignIn</Text>
      <AuthForm
        headerText={"Sign in"}
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText={"Sign in"}
      />
      <Button title="Sign in with Google" onPress={() => startGoogleLogin()} />
      <NavLink
        text="Dont have an account? Sign up Instead"
        routeName="SignUp"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    marginTop: 100,
  },
});
