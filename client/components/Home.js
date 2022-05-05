import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";

export default function Home({ setUser }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Alarm" component={Alarm} />
      <Tab.Screen name="SetAlarm" component={SetAlarm} />
      <Tab.Screen
        name="Settings"
        children={() => <Settings setUser={setUser} />}
      />
    </Tab.Navigator>
  );
}
