import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import axios from "axios";
import SetAlarmName from "./SetAlarmName";
import SetStartingTime from "./SetStartingTime";
import SetEndTime from "./SetEndTime";
import SetIncrement from "./SetIncrement";

export default function SetAlarm() {
  const [user, setUser] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [increment, setIncrement] = useState("");

  useEffect(async () => {
    const userData = await axios.get("http://localhost:3000/me");
    setUser(userData.data);
    const alarmData = await axios.get("http://localhost:3000/alarms");
    setAlarm(
      alarmData.data.find((alarm) => alarm.user_id === userData.data.id)
    );
  }, []);

  const handleAlarmName = (name) => setName(name);
  const handleStartingTime = (startingTime) => setStartTime(startingTime);
  const handleEndTime = (endTime) => setEndTime(endTime);
  const handleIncrement = (value) => setIncrement(value);

  function handleAdd() {
    if (
      parseInt(startTime.substring(0, 2)) < parseInt(endTime.substring(0, 2)) ||
      (parseInt(startTime.substring(0, 2)) ===
        parseInt(endTime.substring(0, 2)) &&
        parseInt(startTime.substring(3, 5)) < parseInt(endTime.substring(3, 5)))
    ) {
      Alert.alert("Start time must be greater than end time.");
    } else {
      if (!alarm) {
        axios.post("http://localhost:3000/alarms", {
          user_id: user.id,
          alarm_name: name,
          alarm_before: startTime,
          alarm_after: endTime,
          alarm_increment: increment,
          is_disabled: false,
        });
      } else {
        axios.patch(`http://localhost:3000/alarms/${alarm.id}`, {
          alarm_name: name,
          alarm_before: startTime,
          alarm_after: endTime,
          alarm_increment: increment,
          is_disabled: false,
        });
      }
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <SetAlarmName handleAlarmName={handleAlarmName} />
        <View style={styles.timeContainer}>
          <SetStartingTime handleStartingTime={handleStartingTime} />
          <SetEndTime handleEndTime={handleEndTime} />
        </View>
        <SetIncrement handleIncrement={handleIncrement} />
        <Button title="Set Alarm" onPress={handleAdd} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
