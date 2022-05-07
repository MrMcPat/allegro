import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/global";

export default function Signup({ setUser }) {
  const [errors, setErrors] = useState([]);
  const navigation = useNavigation();

  function handleSignup(values) {
    fetch("https://allegro-project.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigation.navigate("Home");
        });
      } else {
        r.json().then((err) => alert(err.errors));
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
      <View style={[globalStyles.container, styles.container]}>
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
              <Text style={globalStyles.text}>Email</Text>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
              />
              <Text style={globalStyles.text}>Your Name</Text>
              <TextInput
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                style={styles.input}
              />
              <Text style={globalStyles.text}>Password</Text>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
                style={styles.input}
              />
              <Text style={globalStyles.text}>Confirm Password</Text>
              <TextInput
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
                secureTextEntry={true}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={[globalStyles.touch, { marginTop: 20 }]}
              >
                <Text style={globalStyles.text}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
  },
  input: {
    margin: 10,
    width: 200,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#78938A",
    color: "#D9E4DD",
  },
});
