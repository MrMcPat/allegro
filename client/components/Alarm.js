import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Alarm({ alarm, alarmDateTime, alarmTomorrow }) {
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
