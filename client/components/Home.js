import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({
  setUser,
  alarmTrigger,
  setAlarmTrigger,
  setUserAlarmName,
}) {
  const [toggle, setToggle] = useState(false);
  const Tab = createBottomTabNavigator();
  const [currentUser, setCurrentUser] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const [alarmDateTime, setAlarmDateTime] = useState([]);
  const [alarmTomorrow, setAlarmTomorrow] = useState([]);

  useEffect(async () => {
    const currentDate =
      String(new Date().getFullYear()).padStart(2, "0") +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0");

    const userData = await axios.get(
      "https://allegro-project.herokuapp.com/me"
    );
    setCurrentUser(userData.data);
    const alarmData = await axios.get(
      "https://allegro-project.herokuapp.com/alarms"
    );
    const userAlarm = alarmData.data.find(
      (alarm) => alarm.user_id === userData.data.id
    );
    setAlarm(userAlarm);
    userAlarm ? setUserAlarmName(userAlarm.alarm_name) : null;
    if (userAlarm) {
      let hourDiff =
        userAlarm.alarm_before.substring(3, 5) ===
        userAlarm.alarm_after.substring(3, 5)
          ? parseInt(userAlarm.alarm_before.substring(0, 2)) -
            parseInt(userAlarm.alarm_after.substring(0, 2))
          : parseInt(userAlarm.alarm_before.substring(0, 2)) -
            parseInt(userAlarm.alarm_after.substring(0, 2)) -
            1;
      let minuteDiff;
      hourDiff =
        parseInt(userAlarm.alarm_before.substring(3, 5)) >
        parseInt(userAlarm.alarm_after.substring(3, 5))
          ? hourDiff + 1
          : hourDiff;

      if (
        parseInt(userAlarm.alarm_before.substring(3, 5)) ===
        parseInt(userAlarm.alarm_after.substring(3, 5))
      ) {
        minuteDiff = 0;
      } else if (
        parseInt(userAlarm.alarm_before.substring(3, 5)) >
        parseInt(userAlarm.alarm_after.substring(3, 5))
      ) {
        hourDiff + 1;
        minuteDiff =
          parseInt(userAlarm.alarm_before.substring(3, 5)) -
          parseInt(userAlarm.alarm_after.substring(3, 5));
      } else if (
        parseInt(userAlarm.alarm_before.substring(3, 5)) <
        parseInt(userAlarm.alarm_after.substring(3, 5))
      ) {
        minuteDiff =
          60 -
          (parseInt(userAlarm.alarm_after.substring(3, 5)) -
            parseInt(userAlarm.alarm_before.substring(3, 5)));
      }
      let totalTime = hourDiff * 60 + minuteDiff;
      let totalDays = Math.floor(totalTime / userAlarm.alarm_increment) + 1;
      const tomorrow = new Date(userAlarm.updated_at);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let alarmArray = [
        {
          day: JSON.stringify(tomorrow).substring(1, 11),
          time: userAlarm.alarm_before,
        },
      ];
      for (let i = 2; i <= totalDays; i++) {
        const nextDay = new Date(userAlarm.updated_at);
        nextDay.setDate(nextDay.getDate() + i);

        let hour;
        let minute;
        if (parseInt(userAlarm.alarm_before.substring(3, 5)) === 0) {
          hour = parseInt(userAlarm.alarm_before.substring(0, 2)) - 1;
          minute = 60 - userAlarm.alarm_increment * (i - 1);
          for (
            let j = 1;
            j <
            parseInt(userAlarm.alarm_before.substring(0, 2)) -
              parseInt(userAlarm.alarm_after.substring(0, 2));
            j++
          ) {
            if (minute < 0) {
              hour--;
              minute = 60 + minute;
            }
          }
          alarmArray.push({
            day: JSON.stringify(nextDay).substring(1, 11),
            time: `${hour.toString().padStart(2, 0)}:${minute
              .toString()
              .padStart(2, 0)}`,
          });
        } else {
          hour = parseInt(userAlarm.alarm_before.substring(0, 2));
          minute =
            parseInt(userAlarm.alarm_before.substring(3, 5)) -
            userAlarm.alarm_increment * i;
          for (
            let j = 0;
            j <=
            parseInt(userAlarm.alarm_before.substring(0, 2)) -
              parseInt(userAlarm.alarm_after.substring(0, 2));
            j++
          ) {
            if (minute < 0) {
              hour--;
              minute = 60 + minute;
            }
          }
          alarmArray.push({
            day: JSON.stringify(nextDay).substring(1, 11),
            time: `${hour.toString().padStart(2, 0)}:${minute
              .toString()
              .padStart(2, 0)}`,
          });
        }
      }
      const alarmToday = alarmArray.find((date) => currentDate === date.day);
      if (alarmToday) {
        setAlarmTrigger(alarmToday);
      } else if (
        !alarmToday &&
        alarmArray.find((date) => new Date(currentDate) > new Date(date.day))
      ) {
        setAlarmTrigger({
          day: new Date(),
          time: alarm.alarm_after,
        });
      } else {
        setAlarmTrigger(null);
      }
      setAlarmDateTime(alarmArray);
      setAlarmTomorrow(
        alarmArray.find((date) => new Date(currentDate) < new Date(date.day))
      );
    }
  }, [toggle]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Alarm") {
            iconName = focused ? "alarm" : "alarm-outline";
          } else if (route.name === "SetAlarm") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "list-sharp" : "list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: "#78938A",
        tabBarActiveTintColor: "#D9E4DD",
        tabBarInactiveBackgroundColor: "#3A6351",
        tabBarInactiveTintColor: "#D9E4DD",
        tabBarBadgeStyle: { marginTop: 20 },
        tabBarLabelStyle: { marginBottom: 30 },
        tabBarStyle: { height: 100, marginBottom: -30 },
      })}
    >
      <Tab.Screen
        name="Alarm"
        children={() => (
          <Alarm
            alarm={alarm}
            alarmDateTime={alarmDateTime}
            alarmTomorrow={alarmTomorrow}
            alarmTrigger={alarmTrigger}
            currentUser={currentUser}
          />
        )}
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
      <Tab.Screen
        name="SetAlarm"
        children={() => <SetAlarm toggle={toggle} setToggle={setToggle} />}
        options={{
          title: "Set Alarm",
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
      <Tab.Screen
        name="Settings"
        children={() => (
          <Settings toggle={toggle} setToggle={setToggle} setUser={setUser} />
        )}
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
    </Tab.Navigator>
  );
}
