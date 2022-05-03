import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarms from "./Alarms";
import CreateAlarm from "./CreateAlarm";
import Settings from "./Settings";

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Alarms" component={Alarms} />
      <Tab.Screen name="CreateAlarm" component={CreateAlarm} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
