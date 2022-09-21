import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { VictoryChart, VictoryPie, VictoryLine } from "victory-native";
import BudgetContext from "../context/useContext";
import { useContext, useState } from "react";

const ChartScreen = ({ navigation }) => {
  const { data } = useContext(BudgetContext);
  const [toggle, setToggle] = useState(true);
  // const chartData = data.Budget.filter((data) => data.budget)
  const expenseChartColor = [
    `#ff4500`,
    `#ff0000`,
    `#ff6347`,
    `#ff8c00`,
    `#8b0000`,
    `#b22222`,
    `#800000`,
    `#ffff00`,
    "purple",
  ];
  const incomeChartColor = [`#228b22`, `#00ff00`, `#6b8e23`];
  const expensechart = data.Budget.filter((data) => data.budget).map((data) => {
    return { x: data.category, y: (data.value / 100) * 360 };
  });
  const incomeData = data.Budget.filter(
    (data) => data.income === true && data.value > 0
  );

  const incomechart = incomeData.map((data) => {
    return { x: data.category, y: (data.value / 100) * 360 };
  });

  const ex = data.Budget.filter((data) => data.income === false).map((data) => {
    return { x: +data.date.split("-")[2], y: +data.value };
  });

  const income = incomeData.map((data) => {
    return { x: +data.date.split("-")[2], y: +data.value };
  });
  const Points = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
    { x: 10, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 0 },
    { x: 13, y: 0 },
    { x: 14, y: 0 },
    { x: 15, y: 0 },
    { x: 16, y: 0 },
    { x: 17, y: 0 },
    { x: 18, y: 0 },
    { x: 19, y: 0 },
    { x: 20, y: 0 },
    { x: 21, y: 0 },
    { x: 22, y: 0 },
    { x: 23, y: 0 },
    { x: 24, y: 0 },
    { x: 25, y: 0 },
    { x: 26, y: 0 },
    { x: 27, y: 0 },
    { x: 28, y: 0 },
    { x: 29, y: 0 },
    { x: 30, y: 0 },
  ];
  const expensePoints = [...Points];
  const incomePoints = [...Points];

  ex.forEach((data1) => {
    const item = expensePoints.findIndex((data2) => data1.x === data2.x);

    expensePoints[item] = { x: data1.x, y: expensePoints[item].y + data1.y };
  });
  income.forEach((data1) => {
    const item = incomePoints.findIndex((data2) => data1.x === data2.x);

    incomePoints[item] = { x: data1.x, y: incomePoints[item].y + data1.y };
  });

  console.log(expensePoints);
  return (
    <View
      style={{
        flexDirection: "column",
        borderColor: toggle ? `#cd5c5c` : `#32cd32`,
        borderWidth: 1,
      }}
    >
      <View style={styles.Expenseincomebuttonview}>
        <Pressable
          style={
            toggle
              ? styles.Expenceincomebuttonpressed
              : styles.Expenceincomebutton
          }
          onPress={() => {
            setToggle(true);
          }}
        >
          <Text
            style={
              toggle
                ? { color: `#cd5c5c`, alignSelf: "center" }
                : { color: "black", alignSelf: "center" }
            }
          >
            Expense
          </Text>
        </Pressable>
        <Pressable
          style={
            toggle
              ? styles.Expenceincomebutton
              : styles.Expenceincomebuttonpressed
          }
          onPress={() => {
            setToggle(false);
          }}
        >
          <Text
            style={
              toggle
                ? { color: `black`, alignSelf: "center" }
                : { color: `#32cd32`, alignSelf: "center" }
            }
          >
            Income
          </Text>
        </Pressable>
      </View>

      <VictoryChart>
        <VictoryLine
          data={toggle ? expensePoints : incomePoints}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          //labels={"ljjj"}
        />
      </VictoryChart>
      <Text style={{ alignSelf: "center" }}>Day</Text>

      <View style={{}}>
        <VictoryPie
          data={toggle ? expensechart : incomechart}
          animate={{
            duration: 1000,
          }}
          colorScale={toggle ? expenseChartColor : incomeChartColor}
          height={303}
        />
      </View>
    </View>
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
  Expenseincomebuttonview: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 0.5,
    backgroundColor: `#a9a9a9`,
    borderRadius: 15,
    marginTop: 10,
  },
  Expenceincomebuttonpressed: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
  },
  Expenceincomebutton: {
    width: 100,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
});

export default ChartScreen;
