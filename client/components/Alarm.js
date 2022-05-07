import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnalogClock from "./AnalogClock";

export default function Alarm({
  alarm,
  alarmDateTime,
  alarmTomorrow,
  alarmTrigger,
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
    <View style={styles.container}>
      <AnalogClock
        colorClock="#2196F3"
        colorNumber="#000000"
        colorCenter="#00BCD4"
        colorHour="#FF8F00"
        colorMinutes="#FFC400"
        autostart={true}
        showSeconds
      />
      <Text
        style={{ fontFamily: "Orbitron_400Regular" }}
      >{`${hour}:${minute}:${second}`}</Text>
      {alarm ? (
        <>
          <Text>Alarm name: {alarm.alarm_name}</Text>
          <Text>Start: {alarm.alarm_before}</Text>
          <Text>Goal: {alarm.alarm_after}</Text>
          <Text>Increment: {alarm.alarm_increment}</Text>
          <Text>
            Tomorrow's alarm:{" "}
            {alarmTomorrow.day ? alarmTomorrow.day : "Everyday"} at{" "}
            {alarmTomorrow.time ? alarmTomorrow.time : alarm.alarm_after}
          </Text>
          <Text>
            Today's alarm: {alarmTomorrow ? alarmTrigger.day : "Everyday"} at{" "}
            {alarmTomorrow ? alarmTrigger.time : alarm.alarm_after}
          </Text>
          {alarmTomorrow ? (
            <>
              <Text>
                This is day {alarmDateTime.indexOf(alarmTomorrow)} of your
                progress.
              </Text>
              <Text>
                {alarmDateTime.length - alarmDateTime.indexOf(alarmTomorrow)}{" "}
                day(s) left before your desired wake up goal!
              </Text>
            </>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
