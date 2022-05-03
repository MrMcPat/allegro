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

export default function Login() {
  const [login, setLogin] = useState({});
  function handleLogin(values) {
    setLogin(values);
  }

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
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              style={styles.input}
            />
            <Button onPress={handleSubmit} title="Submit" />
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
