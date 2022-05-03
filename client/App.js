import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function handleFetch() {
      const data = await axios.get("http://localhost:3000/hello");
      setCount(data.data.count);
    }
    handleFetch();
  }, []);

  console.log(count);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={Settings} />
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
