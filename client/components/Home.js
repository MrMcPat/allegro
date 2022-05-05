import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarms from "./Alarms";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";

export default function Home({ setUser }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Alarms" component={Alarms} />
      <Tab.Screen name="SetAlarm" component={SetAlarm} />
      <Tab.Screen
        name="Settings"
        children={() => <Settings setUser={setUser} />}
      />
    </Tab.Navigator>
  );
}
