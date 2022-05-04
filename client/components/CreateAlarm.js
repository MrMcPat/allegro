import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import CreateAlarmName from "./CreateAlarmName";
import CreateStartingTime from "./CreateStartingTime";
import CreateEndTime from "./CreateEndTime";
import CreateIncrement from "./CreateIncrement";

export default function CreateAlarm() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [increment, setIncrement] = useState("");

  useEffect(async () => {
    const userData = await axios.get("http://localhost:3000/me");
    setUser(userData.data);
  }, []);

  function handleAlarmName(name) {
    setName(name);
  }
  function handleStartingTime(startingTime) {
    setStartTime(startingTime);
  }
  function handleEndTime(endTime) {
    setEndTime(endTime);
  }
  function handleIncrement(value) {
    setIncrement(value);
  }
  function handleAdd() {
    console.log(user.id, name, startTime, endTime, increment);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <CreateAlarmName handleAlarmName={handleAlarmName} />
        <View style={styles.timeContainer}>
          <CreateStartingTime handleStartingTime={handleStartingTime} />
          <CreateEndTime handleEndTime={handleEndTime} />
        </View>
        <CreateIncrement handleIncrement={handleIncrement} />
        <Button title="Add Alarm" onPress={handleAdd} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    marginHorizontal: "10%",
  },
});
