import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [user, setUser] = useState(null);
  const [alarmTrigger, setAlarmTrigger] = useState([]);
  const [time, setTime] = useState(null);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Test",
        body: "Test",
        data: {
          username: user.username,
        },
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(
        `${new Date().getHours().toString().padStart(2, 0)}:${new Date()
          .getMinutes()
          .toString()
          .padStart(2, 0)}`
      );
      if (user && alarmTrigger) {
        if (time === alarmTrigger.time) {
          scheduleNotificationHandler();
        }
      }
    }, 60000);
  }, [time]);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            children={() => (
              <Home setUser={setUser} setAlarmTrigger={setAlarmTrigger} />
            )}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            children={() => <Login setUser={setUser} />}
          />
          <Stack.Screen
            name="Signup"
            children={() => <Signup setUser={setUser} />}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
