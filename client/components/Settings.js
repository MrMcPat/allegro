import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Settings({ setUser }) {
  const navigation = useNavigation();

  function handleLogout() {
    fetch("https://allegro-project.herokuapp.com/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigation.navigate("Landing");
      }
    });
  }

  return (
    <View>
      <Text>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
