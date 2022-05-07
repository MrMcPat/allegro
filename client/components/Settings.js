import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import axios from "axios";
import { globalStyles } from "../styles/global";

export default function Settings({ toggle, setToggle, setUser }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const navigation = useNavigation();

  useEffect(async () => {
    const userData = await axios.get(
      "https://allegro-project.herokuapp.com/me"
    );
    setCurrentUser(userData.data);
    const alarmData = await axios.get(
      "https://allegro-project.herokuapp.com/alarms"
    );
    const userAlarm = alarmData.data.find(
      (alarm) => alarm.user_id === userData.data.id
    );
    setAlarm(userAlarm);
  }, [toggle]);

  function handleLogout() {
    fetch("https://allegro-project.herokuapp.com/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigation.navigate("Landing");
      }
    });
  }

  function handleChangeUsername(values) {
    if (values.username.length === 0) {
      Alert.alert("Username cannot be blank.");
    } else {
      axios
        .patch(
          `https://allegro-project.herokuapp.com/users/${currentUser.id}`,
          {
            username: values.username,
          }
        )
        .catch((error) => {
          if (error.response) {
            Alert.alert("Username successfully changed.");
          }
        });
      setToggle((toggle) => !toggle);
    }
  }

  function handleChangeEmail(values) {
    if (values.email.length === 0 || !values.email.includes("@")) {
      Alert.alert("Please enter a valid email.");
    } else {
      axios
        .patch(
          `https://allegro-project.herokuapp.com/users/${currentUser.id}`,
          {
            email: values.email,
          }
        )
        .catch((error) => {
          if (error.response) {
            Alert.alert("Email successfully changed.");
          }
        });
      setToggle((toggle) => !toggle);
    }
  }

  function handleChangePassword(values) {
    if (
      values.oldPassword.length === 0 ||
      values.password.length === 0 ||
      values.passwordConfirmation.length === 0
    ) {
      Alert.alert("Please enter all fields.");
    } else if (values.password !== values.passwordConfirmation) {
      Alert.alert("Please confirm password again.");
    } else {
      axios
        .patch(
          `https://allegro-project.herokuapp.com/users/${currentUser.id}`,
          {
            old_password: values.oldPassword,
            password: values.password,
            password_confirmation: values.password_confirmation,
          }
        )
        .catch((error) => {
          if (error.response) {
            Alert.alert("Password successfully changed.");
          }
        });
      setToggle((toggle) => !toggle);
    }
  }

  function handleDisableAlarm() {
    axios
      .patch(`https://allegro-project.herokuapp.com/alarms/${alarm.id}`, {
        is_disabled: !alarm.is_disabled,
      })
      .catch((error) => {
        return null;
      });
    setToggle((toggle) => !toggle);
  }

  return (
    <View style={globalStyles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Formik
            initialValues={{ username: "" }}
            onSubmit={handleChangeUsername}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <TextInput
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  style={styles.input}
                  placeholder={`Username: ${currentUser.username}`}
                  placeholderTextColor="grey"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={globalStyles.touch}
                >
                  <Text style={globalStyles.text}>Change</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Formik initialValues={{ email: "" }} onSubmit={handleChangeEmail}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.input}
                  placeholder={`email: ${currentUser.email}`}
                  placeholderTextColor="grey"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={globalStyles.touch}
                >
                  <Text style={globalStyles.text}>Change</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Text style={globalStyles.text}>Change Password</Text>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              passwordConfirmation: "",
            }}
            onSubmit={handleChangePassword}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.passwordForm}>
                <TextInput
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  value={values.oldPassword}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Enter old password"
                  placeholderTextColor="grey"
                />
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Enter new password"
                  placeholderTextColor="grey"
                />
                <TextInput
                  onChangeText={handleChange("passwordConfirmation")}
                  onBlur={handleBlur("passwordConfirmation")}
                  value={values.passwordConfirmation}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Confirm new password"
                  placeholderTextColor="grey"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={globalStyles.touch}
                >
                  <Text style={globalStyles.text}>Update Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.switch}>
            <Text style={globalStyles.text}>Disable Alarm?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#3A6351" }}
              thumbColor={alarm.is_disabled ? "#D9E4DD" : "#D9E4DD"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleDisableAlarm}
              value={alarm.is_disabled}
            />
          </View>

          <TouchableOpacity onPress={handleLogout} style={globalStyles.touch}>
            <Text style={globalStyles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
  },
  form: {
    flexDirection: "row",
    height: 70,
    marginVertical: 5,
  },
  passwordForm: {
    alignItems: "center",
    marginBottom: 10,
  },
  switch: {
    alignItems: "center",
    marginVertical: 10,
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
