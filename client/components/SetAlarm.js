import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import axios from "axios";
import SetAlarmName from "./SetAlarmName";
import SetStartingTime from "./SetStartingTime";
import SetEndTime from "./SetEndTime";
import SetIncrement from "./SetIncrement";
import { globalStyles } from "../styles/global";

export default function SetAlarm({ toggle, setToggle }) {
  const [user, setUser] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [increment, setIncrement] = useState("");

  useEffect(async () => {
    const userData = await axios.get(
      "https://allegro-project.herokuapp.com/me"
    );
    setUser(userData.data);
    const alarmData = await axios.get(
      "https://allegro-project.herokuapp.com/alarms"
    );
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
        axios.post("https://allegro-project.herokuapp.com/alarms", {
          user_id: user.id,
          alarm_name: name,
          alarm_before: startTime,
          alarm_after: endTime,
          alarm_increment: increment,
          is_disabled: false,
        });
        Alert.alert("Alarm has been set.");
      } else {
        axios.patch(
          `https://allegro-project.herokuapp.com/alarms/${alarm.id}`,
          {
            alarm_name: name,
            alarm_before: startTime,
            alarm_after: endTime,
            alarm_increment: increment,
            is_disabled: false,
          }
        );
        Alert.alert("Alarm has been set.");
      }
      setToggle((toggle) => !toggle);
    }
  }

  return (
    <View style={[globalStyles.container, { paddingTop: "5%" }]}>
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
          <TouchableOpacity
            onPress={handleAdd}
            style={[globalStyles.touch, { marginHorizontal: 50 }]}
          >
            <Text style={globalStyles.text}>Set Alarm</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
