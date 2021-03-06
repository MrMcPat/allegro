import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../styles/global";

import hours from "../timeSelection/hours";
import minutes from "../timeSelection/minutes";

export default function SetEndTime({ handleEndTime }) {
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");

  useEffect(() => {
    handleEndTime(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute]);

  return (
    <View>
      <Text style={globalStyles.text}>End Time</Text>
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={selectedHour}
          onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
          itemStyle={{
            color: "#D9E4DD",
            fontFamily: "Cairo_400Regular",
          }}
        >
          {hours.map((hour) => (
            <Picker.Item
              key={hour.label}
              label={hour.label}
              value={hour.value}
            />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedMinute}
          onValueChange={(itemValue, itemIndex) => setSelectedMinute(itemValue)}
          itemStyle={{
            color: "#D9E4DD",
            fontFamily: "Cairo_400Regular",
          }}
        >
          {minutes.map((minute) => (
            <Picker.Item
              key={minute.label}
              label={minute.label}
              value={minute.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  picker: {
    width: 90,
  },
});
