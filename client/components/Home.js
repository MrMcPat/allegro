import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";

export default function Home({ setUser }) {
  const [toggle, setToggle] = useState(false);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Alarm" children={() => <Alarm toggle={toggle} />} />
      <Tab.Screen
        name="SetAlarm"
        children={() => <SetAlarm toggle={toggle} setToggle={setToggle} />}
      />
      <Tab.Screen
        name="Settings"
        children={() => <Settings setUser={setUser} />}
      />
    </Tab.Navigator>
  );
}
