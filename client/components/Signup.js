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

export default function Signup() {
  const [signup, setSignup] = useState({});
  function handleSignup(values) {
    setSignup(values);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={handleSignup}
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
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              value={values.passwordConfirmation}
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
