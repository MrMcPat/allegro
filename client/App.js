import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import * as Notifications from "expo-notifications";
import {
  useFonts,
  Orbitron_400Regular,
  Cairo_400Regular,
} from "@expo-google-fonts/dev";

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
  const [userAlarmName, setUserAlarmName] = useState("");

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: userAlarmName.length > 0 ? userAlarmName : "Alarm",
        body: "TIME TO WAKE UP!",
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
    fetch("https://allegro-project.herokuapp.com/me").then((r) => {
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
          alert("WAKE UP");
        }
      }
    }, 60000);
    return () => {
      clearInterval(time);
    };
  }, [time]);

  const Stack = createNativeStackNavigator();

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Cairo_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        {user ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              children={() => (
                <Home
                  setUser={setUser}
                  alarmTrigger={alarmTrigger}
                  setAlarmTrigger={setAlarmTrigger}
                  setUserAlarmName={setUserAlarmName}
                />
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
              options={{
                headerStyle: {
                  backgroundColor: "#3A6351",
                },
                headerTitleStyle: {
                  color: "#D9E4DD",
                  fontFamily: "Cairo_400Regular",
                  fontSize: 25,
                },
                headerTintColor: "#D9E4DD",
              }}
            />
            <Stack.Screen
              name="Signup"
              children={() => <Signup setUser={setUser} />}
              options={{
                headerStyle: {
                  backgroundColor: "#3A6351",
                },
                headerTitleStyle: {
                  color: "#D9E4DD",
                  fontFamily: "Cairo_400Regular",
                  fontSize: 25,
                },
                headerTintColor: "#D9E4DD",
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}
