import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

//import pieChart from "react-native-pie-chart";

const ChartScreen = ({ navigation }) => {
  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Basic</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default ChartScreen;
