import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function Alarms() {
  const [user, setUser] = useState([]);
  const [alarm, setAlarm] = useState([])
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
    setAlarm(alarmData.data.find(alarm => alarm.user_id === userData.data.id));
  }, []);

  console.log(alarm)
  return (
    <View>
      <Text>Alarms</Text>
    </View>
  );
}
