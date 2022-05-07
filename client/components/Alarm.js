import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnalogClock from "./AnalogClock";
import { globalStyles } from "../styles/global";

export default function Alarm({
  alarm,
  alarmDateTime,
  alarmTomorrow,
  currentUser,
}) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");

  useEffect(() => {
    setInterval(() => {
      setHour(new Date().getHours().toString().padStart(2, 0));
      setMinute(new Date().getMinutes().toString().padStart(2, 0));
      setSecond(new Date().getSeconds().toString().padStart(2, 0));
    }, 1000);
  }, [second]);

  return (
    <View style={[globalStyles.container, { paddingTop: 30 }]}>
      <Text style={[globalStyles.text, { fontSize: 30 }]}>
        Hi {currentUser.username}!
      </Text>
      <AnalogClock
        colorClock="#3A6351"
        colorNumber="#D9E4DD"
        colorCenter="#D9E4DD"
        colorHour="#FF8AAE"
        colorMinutes="#F9CEEE"
        autostart={true}
        showSeconds
      />
      <Text
        style={[globalStyles.text, styles.digitalClock]}
      >{`${hour}:${minute}:${second}`}</Text>
      {alarm ? (
        <>
          <Text style={globalStyles.text}>Alarm name: {alarm.alarm_name}</Text>
          <View style={styles.timeContainer}>
            <View style={styles.card}>
              <Text style={[globalStyles.text]}>Start</Text>
              <Text style={globalStyles.text}>{alarm.alarm_before}</Text>
            </View>
            <View style={styles.card}>
              <Text style={globalStyles.text}>Increment</Text>
              <Text style={globalStyles.text}>
                {alarm.alarm_increment} min(s)
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={globalStyles.text}>Goal</Text>
              <Text style={globalStyles.text}>{alarm.alarm_after}</Text>
            </View>
          </View>
          <Text style={globalStyles.text}>
            Tomorrow's alarm:{" "}
            {alarmTomorrow.day ? alarmTomorrow.day : "Everyday"} at{" "}
            {alarmTomorrow.time ? alarmTomorrow.time : alarm.alarm_after}
          </Text>
          {alarmTomorrow ? (
            <>
              <Text style={globalStyles.text}>
                This is day {alarmDateTime.indexOf(alarmTomorrow)} of your
                progress.
              </Text>
              <Text style={globalStyles.text}>
                {alarmDateTime.length - alarmDateTime.indexOf(alarmTomorrow)}{" "}
                day(s) left before you reach your goal!
              </Text>
            </>
          ) : (
            <Text style={globalStyles.text}>You have reached your goal!</Text>
          )}
        </>
      ) : (
        <>
          <Text style={globalStyles.text}>Please set your alarm.</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  digitalClock: {
    fontFamily: "Orbitron_400Regular",
    width: 180,
    fontSize: 30,
    marginTop: 15,
    padding: 5,
    borderColor: "#78938A",
    backgroundColor: "black",
    borderWidth: 3,
  },
  timeContainer: {
    flexDirection: "row",
  },
  card: {
    width: 100,
    backgroundColor: "#3A6351",
    margin: 10,
    borderColor: "#78938A",
    borderRadius: 10,
    borderWidth: 2,
  },
});
