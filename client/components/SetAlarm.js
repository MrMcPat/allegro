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
  const [alarm, setAlarm] = useState([])
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [increment, setIncrement] = useState("");

  useEffect(async () => {
    const userData = await axios.get("http://localhost:3000/me");
    setUser(userData.data);
    const alarmData = await axios.get("http://localhost:3000/alarms")
    setAlarm(alarmData.data.find(alarm => alarm.user_id === userData.data.id))
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
      // let hourDiff =
      //   startTime.substring(3, 5) === endTime.substring(3, 5)
      //     ? parseInt(startTime.substring(0, 2)) -
      //       parseInt(endTime.substring(0, 2))
      //     : parseInt(startTime.substring(0, 2)) -
      //       parseInt(endTime.substring(0, 2)) -
      //       1;
      // let minuteDiff;
      // hourDiff =
      //   parseInt(startTime.substring(3, 5)) > parseInt(endTime.substring(3, 5))
      //     ? hourDiff + 1
      //     : hourDiff;

      // if (
      //   parseInt(startTime.substring(3, 5)) ===
      //   parseInt(endTime.substring(3, 5))
      // ) {
      //   minuteDiff = 0;
      // } else if (
      //   parseInt(startTime.substring(3, 5)) > parseInt(endTime.substring(3, 5))
      // ) {
      //   hourDiff + 1;
      //   minuteDiff =
      //     parseInt(startTime.substring(3, 5)) -
      //     parseInt(endTime.substring(3, 5));
      // } else if (
      //   parseInt(startTime.substring(3, 5)) < parseInt(endTime.substring(3, 5))
      // ) {
      //   minuteDiff =
      //     60 -
      //     (parseInt(endTime.substring(3, 5)) -
      //       parseInt(startTime.substring(3, 5)));
      // }
      // let totalTime = hourDiff * 60 + minuteDiff;
      // let totalDays = Math.floor(totalTime / increment) + 1;
      // const tomorrow = new Date();
      // tomorrow.setDate(tomorrow.getDate() + 1);
      // let dayArray = [JSON.stringify(tomorrow).substring(1, 11)];
      // let timeArray = [startTime];
      // for (let i = 2; i <= totalDays; i++) {
      //   const nextDay = new Date();
      //   nextDay.setDate(nextDay.getDate() + i);
      //   dayArray.push(JSON.stringify(nextDay).substring(1, 11));
      //   let hour;
      //   let minute;
      //   if (parseInt(startTime.substring(3, 5)) === 0) {
      //     hour = parseInt(startTime.substring(0, 2)) - 1;
      //     minute = 60 - increment * (i - 1);
      //     for (
      //       let j = 1;
      //       j <
      //       parseInt(startTime.substring(0, 2)) -
      //         parseInt(endTime.substring(0, 2));
      //       j++
      //     ) {
      //       if (minute < 0) {
      //         hour--;
      //         minute = 60 + minute;
      //       }
      //     }
      //     timeArray.push(
      //       `${hour.toString().padStart(2, 0)}:${minute
      //         .toString()
      //         .padStart(2, 0)}`
      //     );
      //   } else {
      //     hour = parseInt(startTime.substring(0, 2));
      //     minute = parseInt(startTime.substring(3, 5)) - increment * i;
      //     for (
      //       let j = 0;
      //       j <=
      //       parseInt(startTime.substring(0, 2)) -
      //         parseInt(endTime.substring(0, 2));
      //       j++
      //     ) {
      //       if (minute < 0) {
      //         hour--;
      //         minute = 60 + minute;
      //       }
      //     }
      //     timeArray.push(
      //       `${hour.toString().padStart(2, 0)}:${minute
      //         .toString()
      //         .padStart(2, 0)}`
      //     );
      //   }
      // }
      // console.log(JSON.stringify(dayArray));
      // console.log(JSON.stringify(timeArray));
      if (!alarm) {
        axios.post("http://localhost:3000/alarms", {
          user_id: user.id,
          alarm_name: name,
          alarm_before: startTime,
          alarm_after: endTime,
          alarm_increment: increment,
          is_disabled: false,
        })
      } else {
        axios.patch(`http://localhost:3000/alarms/${alarm.id}`, {
          alarm_name: name,
          alarm_before: startTime,
          alarm_after: endTime,
          alarm_increment: increment,
          is_disabled: false,
        })
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
