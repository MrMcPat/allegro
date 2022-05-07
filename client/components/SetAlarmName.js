import { StyleSheet, Text, View, TextInput } from "react-native";
import { globalStyles } from "../styles/global";

export default function SetAlarmName({ handleAlarmName }) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.text}>Set Alarm Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleAlarmName(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    margin: 10,
    width: 200,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#78938A",
    color: "#D9E4DD",
  },
});
