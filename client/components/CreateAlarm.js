import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";

export default function CreateAlarm() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [desiredTime, setDesiredTime] = useState("");
  const [increment, setIncrement] = useState("");

  useEffect(async () => {
    const userData = await axios.get("http://localhost:3000/me");
    setUser(userData.data);
  }, []);

  function handleAlarmName() {
    // setName("My Alarm");
  }
  function handleStartingTime() {
    // setStartTime("8:00");
  }
  function handleDesiredTime() {
    // setDesiredTime("7:00");
  }
  function handleIncrement() {
    // setIncrement(3);
  }
  function handleAdd() {
    console.log(name, startTime, desiredTime, increment);
  }

  return (
    <View>
      <TouchableHighlight onPress={handleAlarmName}>
        <View style={styles.button}>
          <Text>Enter Alarm Name</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleStartingTime}>
        <View style={styles.button}>
          <Text>Starting Time</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleDesiredTime}>
        <View style={styles.button}>
          <Text>Desired Time</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleIncrement}>
        <View style={styles.button}>
          <Text>Increment</Text>
        </View>
      </TouchableHighlight>
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
