import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import hours from "../timeSelection/hours";
import minutes from "../timeSelection/minutes";

export default function CreateEndTime({ handleEndTime }) {
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [isFocusHour, setIsFocusHour] = useState(false);
  const [isFocusMinute, setIsFocusMinute] = useState(false);

  return (
    <View>
      <Text>Select End Time</Text>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocusHour && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={hours}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusHour ? "Select hour" : "..."}
          searchPlaceholder="Search..."
          value={hour}
          onFocus={() => setIsFocusHour(true)}
          onBlur={() => setIsFocusHour(false)}
          onChange={(item) => {
            setHour(item.value);
            setIsFocusHour(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocusMinute && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={minutes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusMinute ? "Select minute" : "..."}
          searchPlaceholder="Search..."
          value={minute}
          onFocus={() => setIsFocusMinute(true)}
          onBlur={() => setIsFocusMinute(false)}
          onChange={(item) => {
            setMinute(item.value);
            setIsFocusMinute(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: "45%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
