import { View, Text, StyleSheet, FlatList } from "react-native";
import { Agenda, Calendar, CalendarList } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import moment from "moment";
import BudgetContext from "../context/useContext";

const CalenderScreen = (navigation) => {
  const { data } = useContext(BudgetContext);

  const today = moment(new Date()).format("YYYY-MM-DD");
  const [date, setdate] = useState(today);
  const style = {};

  const dataDatePressed = data.Budget.filter((data) => data.date === date);
  const dataAddSymbol = dataDatePressed.map((data) => {
    return {
      ...data,
      value: data.income ? +data.value : -Math.abs(data.value),
    };
  });

  data.Budget.forEach(
    (todo) =>
      (style[todo.date] = {
        selected: true,
        marked: true,
        //selectedColor: `#66cdaa`,
        dotColor: todo.income === true ? "green" : "red",
      })
  );

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <Agenda
          selected={today}
          onDayPress={(day) => {
            setdate(day.dateString);
          }}
          style={{ height: 150 }}
          markedDates={style}
        ></Agenda>
      </View>
      <View style={styles.listConainer}>
        <View style={styles.summaryExpense}>
          <Text style={{ color: "grey" }}>{moment(date).format("ll")}</Text>
          <Text style={{ color: "grey" }}>
            {dataAddSymbol.length > 0
              ? ` \u20A6 ${dataAddSymbol.reduce(
                  (acc, cur) => acc + +cur.value,
                  0
                )}`
              : `\u20A6 0.00`}
          </Text>
        </View>
        <Text
          style={
            dataDatePressed.length === 0
              ? {
                  alignSelf: "center",
                  color: "grey",
                  marginVertical: 150,
                }
              : null
          }
        >
          {dataDatePressed.length === 0
            ? "No transactions in this day yet"
            : null}
        </Text>
        <FlatList
          data={dataDatePressed}
          keyExtractor={(result) => result.id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 0.5,
                  borderColor: `#a9a9a9`,
                  marginLeft: 15,
                  marginVertical: 15,
                }}
              >
                <MaterialIcons
                  name={item.icon}
                  size={30}
                  color={item.income ? `#32cd32` : `#cd5c5c`}
                />
                <Text style={{ color: item.income ? `#32cd32` : `#cd5c5c` }}>
                  {"\u20A6"}
                  {item.value}
                </Text>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Emptycontainer: { alignItems: "center", marginTop: 150 },
  Emptytext: { color: "grey" },
  container: {
    flex: 1,

    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
  listConainer: {
    marginTop: 10,
  },
  summaryExpense: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: `#a9a9a9`,
    marginTop: 10,
    marginBottom: 10,
  },
});
export default CalenderScreen;
