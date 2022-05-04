import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function CreateAlarmName({ handleAlarmName }) {
  return (
    <View style={styles.container}>
      <Text>Enter Alarm Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleAlarmName(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    left: "30%",
  },
  input: {
    margin: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    width: 150,
    // borderBottomColor: "#ddd",
  },
});
