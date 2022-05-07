import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { globalStyles } from "../styles/global";
import logo from "../assets/rewind-time.png";

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/rewind-time.png")}
          />
          <Text style={styles.title}>Allegro</Text>
          <Text style={globalStyles.text}>a sleep pattern adjusting app</Text>
        </View>
        <View style={styles.loginsignup}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={globalStyles.touch}
          >
            <Text style={globalStyles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={globalStyles.touch}
          >
            <Text style={globalStyles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 50,
    marginTop: "30%",
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  title: {
    color: "#88d08c",
    fontSize: 40,
    fontFamily: "Orbitron_400Regular",
    paddingBottom: 10,
  },
  loginsignup: {
    alignItems: "center",
  },
});
