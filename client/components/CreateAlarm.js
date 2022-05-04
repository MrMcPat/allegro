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
    if (
      parseInt(startTime.substring(0, 2)) < parseInt(endTime.substring(0, 2)) ||
      (parseInt(startTime.substring(0, 2)) ===
        parseInt(endTime.substring(0, 2)) &&
        parseInt(startTime.substring(3, 5)) < parseInt(endTime.substring(3, 5)))
    ) {
      alert("Start time must be greater than end time.");
    } else {
      let postAlarm = {
        user_id: user.id,
        alarm_name: name,
        alarm_before: startTime,
        alarm_after: endTime,
        increment: increment,
      };
      let hourDiff =
        startTime.substring(3, 5) === endTime.substring(3, 5)
          ? parseInt(startTime.substring(0, 2)) -
            parseInt(endTime.substring(0, 2))
          : parseInt(startTime.substring(0, 2)) -
            parseInt(endTime.substring(0, 2)) -
            1;
      let minuteDiff;
      hourDiff =
        parseInt(startTime.substring(3, 5)) > parseInt(endTime.substring(3, 5))
          ? hourDiff + 1
          : hourDiff;

      if (
        parseInt(startTime.substring(3, 5)) ===
        parseInt(endTime.substring(3, 5))
      ) {
        minuteDiff = 0;
      } else if (
        parseInt(startTime.substring(3, 5)) > parseInt(endTime.substring(3, 5))
      ) {
        hourDiff + 1;
        minuteDiff =
          parseInt(startTime.substring(3, 5)) -
          parseInt(endTime.substring(3, 5));
      } else if (
        parseInt(startTime.substring(3, 5)) < parseInt(endTime.substring(3, 5))
      ) {
        minuteDiff =
          60 -
          (parseInt(endTime.substring(3, 5)) -
            parseInt(startTime.substring(3, 5)));
      }
      let totalTime = hourDiff * 60 + minuteDiff;
      let totalDays = Math.floor(totalTime / increment) + 1;
      console.log(totalDays);
      let dayArray = [];
      let timeArray = [];
      for (let i = 1; i <= totalDays; i++) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        dayArray.push(JSON.stringify(tomorrow).substring(1, 11));
      }
      console.log(dayArray);
    }
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
