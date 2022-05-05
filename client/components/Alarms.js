import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function Alarms() {
  const [user, setUser] = useState([]);
  const [alarm, setAlarm] = useState([])
  const [alarmDay, setAlarmDay] = useState([])
  const [alarmTime, setAlarmTime] = useState([])
  // const currentDate =
  //   String(new Date().getFullYear()).padStart(2, "0") +
  //   "-" +
  //   String(new Date().getMonth() + 1).padStart(2, "0") +
  //   "-" +
  //   String(new Date().getDate()).padStart(2, "0");
  // console.log(currentDate);
  useEffect(async () => {
    const userData = await axios.get("http://localhost:3000/me");
    setUser(userData.data);
    const alarmData = await axios.get("http://localhost:3000/alarms");
    const userAlarm = alarmData.data.find(alarm => alarm.user_id === userData.data.id);
    setAlarm(userAlarm)
    if (userAlarm) {
      let hourDiff =
      userAlarm.alarm_before.substring(3, 5) === userAlarm.alarm_after.substring(3, 5)
        ? parseInt(userAlarm.alarm_before.substring(0, 2)) -
          parseInt(userAlarm.alarm_after.substring(0, 2))
        : parseInt(userAlarm.alarm_before.substring(0, 2)) -
          parseInt(userAlarm.alarm_after.substring(0, 2)) -
          1;
    let minuteDiff;
    hourDiff =
      parseInt(userAlarm.alarm_before.substring(3, 5)) > parseInt(userAlarm.alarm_after.substring(3, 5))
        ? hourDiff + 1
        : hourDiff;
  
    if (
      parseInt(userAlarm.alarm_before.substring(3, 5)) ===
      parseInt(userAlarm.alarm_after.substring(3, 5))
    ) {
      minuteDiff = 0;
    } else if (
      parseInt(userAlarm.alarm_before.substring(3, 5)) > parseInt(userAlarm.alarm_after.substring(3, 5))
    ) {
      hourDiff + 1;
      minuteDiff =
        parseInt(userAlarm.alarm_before.substring(3, 5)) -
        parseInt(userAlarm.alarm_after.substring(3, 5));
    } else if (
      parseInt(userAlarm.alarm_before.substring(3, 5)) < parseInt(userAlarm.alarm_after.substring(3, 5))
    ) {
      minuteDiff =
        60 -
        (parseInt(userAlarm.alarm_after.substring(3, 5)) -
          parseInt(userAlarm.alarm_before.substring(3, 5)));
    }
    let totalTime = hourDiff * 60 + minuteDiff;
    let totalDays = Math.floor(totalTime / userAlarm.alarm_increment) + 1;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dayArray = [JSON.stringify(tomorrow).substring(1, 11)];
    let timeArray = [userAlarm.alarm_before];
    for (let i = 2; i <= totalDays; i++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      dayArray.push(JSON.stringify(nextDay).substring(1, 11));
      let hour;
      let minute;
      if (parseInt(userAlarm.alarm_before.substring(3, 5)) === 0) {
        hour = parseInt(userAlarm.alarm_before.substring(0, 2)) - 1;
        minute = 60 - userAlarm.alarm_increment * (i - 1);
        for (
          let j = 1;
          j <
          parseInt(userAlarm.alarm_before.substring(0, 2)) -
            parseInt(userAlarm.alarm_after.substring(0, 2));
          j++
        ) {
          if (minute < 0) {
            hour--;
            minute = 60 + minute;
          }
        }
        timeArray.push(
          `${hour.toString().padStart(2, 0)}:${minute
            .toString()
            .padStart(2, 0)}`
        );
      } else {
        hour = parseInt(userAlarm.alarm_before.substring(0, 2));
        minute = parseInt(userAlarm.alarm_before.substring(3, 5)) - userAlarm.alarm_increment * i;
        for (
          let j = 0;
          j <=
          parseInt(userAlarm.alarm_before.substring(0, 2)) -
            parseInt(userAlarm.alarm_after.substring(0, 2));
          j++
        ) {
          if (minute < 0) {
            hour--;
            minute = 60 + minute;
          }
        }
        timeArray.push(
          `${hour.toString().padStart(2, 0)}:${minute
            .toString()
            .padStart(2, 0)}`
        );
      }
    }
    setAlarmDay(dayArray);
    setAlarmTime(timeArray);
    }
  }, []);

  console.log(alarm)
  console.log(alarmDay)
  console.log(alarmTime)
  return (
    <View>
      <Text>Alarms</Text>
    </View>
  );
}
