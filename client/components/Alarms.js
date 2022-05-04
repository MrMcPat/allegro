import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Alarms() {
  const currentDate =
    String(new Date().getFullYear()).padStart(2, "0") +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
  console.log(currentDate);

  return (
    <View>
      <Text>Alarms</Text>
    </View>
  );
}
