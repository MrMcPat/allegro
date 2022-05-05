import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function Alarm({ toggle }) {
  const [user, setUser] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const [alarmDateTime, setAlarmDateTime] = useState([]);
  const [alarmTomorrow, setAlarmTomorrow] = useState([]);

  useEffect(async () => {
    const currentDate =
      String(new Date().getFullYear()).padStart(2, "0") +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0");

    const userData = await axios.get("http://localhost:3000/me");
    setUser(userData.data);
    const alarmData = await axios.get("http://localhost:3000/alarms");
    const userAlarm = alarmData.data.find(
      (alarm) => alarm.user_id === userData.data.id
    );
    setAlarm(userAlarm);
    if (userAlarm) {
      let hourDiff =
        userAlarm.alarm_before.substring(3, 5) ===
        userAlarm.alarm_after.substring(3, 5)
          ? parseInt(userAlarm.alarm_before.substring(0, 2)) -
            parseInt(userAlarm.alarm_after.substring(0, 2))
          : parseInt(userAlarm.alarm_before.substring(0, 2)) -
            parseInt(userAlarm.alarm_after.substring(0, 2)) -
            1;
      let minuteDiff;
      hourDiff =
        parseInt(userAlarm.alarm_before.substring(3, 5)) >
        parseInt(userAlarm.alarm_after.substring(3, 5))
          ? hourDiff + 1
          : hourDiff;

      if (
        parseInt(userAlarm.alarm_before.substring(3, 5)) ===
        parseInt(userAlarm.alarm_after.substring(3, 5))
      ) {
        minuteDiff = 0;
      } else if (
        parseInt(userAlarm.alarm_before.substring(3, 5)) >
        parseInt(userAlarm.alarm_after.substring(3, 5))
      ) {
        hourDiff + 1;
        minuteDiff =
          parseInt(userAlarm.alarm_before.substring(3, 5)) -
          parseInt(userAlarm.alarm_after.substring(3, 5));
      } else if (
        parseInt(userAlarm.alarm_before.substring(3, 5)) <
        parseInt(userAlarm.alarm_after.substring(3, 5))
      ) {
        minuteDiff =
          60 -
          (parseInt(userAlarm.alarm_after.substring(3, 5)) -
            parseInt(userAlarm.alarm_before.substring(3, 5)));
      }
      let totalTime = hourDiff * 60 + minuteDiff;
      let totalDays = Math.floor(totalTime / userAlarm.alarm_increment) + 1;
      const tomorrow = new Date(userAlarm.updated_at);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let alarmArray = [
        {
          day: JSON.stringify(tomorrow).substring(1, 11),
          time: userAlarm.alarm_before,
        },
      ];
      for (let i = 2; i <= totalDays; i++) {
        const nextDay = new Date(userAlarm.updated_at);
        nextDay.setDate(nextDay.getDate() + i);

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
          alarmArray.push({
            day: JSON.stringify(nextDay).substring(1, 11),
            time: `${hour.toString().padStart(2, 0)}:${minute
              .toString()
              .padStart(2, 0)}`,
          });
        } else {
          hour = parseInt(userAlarm.alarm_before.substring(0, 2));
          minute =
            parseInt(userAlarm.alarm_before.substring(3, 5)) -
            userAlarm.alarm_increment * i;
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
          alarmArray.push({
            day: JSON.stringify(nextDay).substring(1, 11),
            time: `${hour.toString().padStart(2, 0)}:${minute
              .toString()
              .padStart(2, 0)}`,
          });
        }
      }
      // console.log(currentDate);
      setAlarmDateTime(alarmArray);
      setAlarmTomorrow(
        alarmArray.find((date) => new Date(currentDate) < new Date(date.day))
      );
    }
  }, [toggle]);
  // console.log(alarm);
  console.log(alarmDateTime.length - alarmDateTime.indexOf(alarmTomorrow));
  // console.log(alarmDateTime.indexOf(alarmTomorrow));

  return (
    <View>
      {alarm ? (
        <>
          <Text>{alarm.alarm_name}</Text>
          <Text>{alarm.alarm_before}</Text>
          <Text>{alarm.alarm_after}</Text>
          <Text>{alarm.alarm_increment}</Text>
          <Text>
            Tomorrow's alarm:{" "}
            {alarmTomorrow.day ? alarmTomorrow.day : "Everyday"} at{" "}
            {alarmTomorrow.time ? alarmTomorrow.time : alarm.alarm_after}
          </Text>
          {alarmTomorrow ? (
            <Text>
              {alarmDateTime.length - alarmDateTime.indexOf(alarmTomorrow)}{" "}
              day(s) left before your desired wake up goal!
            </Text>
          ) : (
            <Text>You have reached your goal!</Text>
          )}
        </>
      ) : (
        <>
          <Text>Please set your alarm.</Text>
        </>
      )}
    </View>
  );
}
