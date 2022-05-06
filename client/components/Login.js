import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

export default function Login({ setUser }) {
  const [errors, setErrors] = useState([]);
  const navigation = useNavigation();

  function handleLogin(values) {
    fetch("https://allegro-project.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigation.navigate("Home");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  console.log(errors);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
            />
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              style={styles.input}
            />
            <Button onPress={handleSubmit} title="Login" />
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    // borderBottomColor: "#ddd",
  },
});
