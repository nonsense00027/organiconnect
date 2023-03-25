import { Text, View, StyleSheet } from "react-native";
import Colors from "../../../shared/theme/Colors";
import Shops from "./components/Shops/Shops";

export default function Home() {
  return (
    <View style={styles.home}>
      <Shops />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
});
