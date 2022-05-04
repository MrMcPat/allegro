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

  function handleAlarmName() {
    // setName("My Alarm");
  }
  function handleStartingTime() {
    // setStartTime("8:00");
  }
  function handleEndTime() {
    // setEndTime("7:00");
  }
  function handleIncrement() {
    // setIncrement(3);
  }
  function handleAdd() {
    // console.log(name, startTime, endTime, increment);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <CreateAlarmName handleAlarmName={handleAlarmName} />
        <CreateStartingTime handleStartingTime={handleStartingTime} />
        <CreateEndTime handleEndTime={handleEndTime} />
        <CreateIncrement handleIncrement={handleIncrement} />
        <Button title="Add" onPress={handleAdd} />
      </View>
    </TouchableWithoutFeedback>
  );
}
