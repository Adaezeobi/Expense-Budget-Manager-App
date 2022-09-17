import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import BudgetContext from "../context/useContext";
import { Entypo } from "@expo/vector-icons";

const BudgetCategory = ({ navigation }) => {
  const { data } = useContext(BudgetContext);
  /*const category = [
    { category: "Groceries", icon: "local-grocery-store" },
    { category: "Food", icon: "food-bank" },
    { category: "Savings", icon: "attach-money" },
    { category: "Gifts", icon: "card-giftcard" },
    { category: "Cabs", icon: "local-taxi" },
    { category: "Health & Fitness", icon: "fitness-center" },
    { category: "Entertainment", icon: "videogame-asset" },
    { category: "Tithe", icon: "money" },
  ];

  const initialBudget = category.map((cat) => {
    return {
      ...cat,
      id: Math.floor(Math.random() * 99999),
    };
  });
*/
  const budget = data.Budget.filter((dat) => dat.status !== undefined);
  console.log(budget);
  //console.log(data.Budget);
  return (
    <View>
      <FlatList
        data={budget}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{ borderBottomWidth: 0.5, borderColor: `#a9a9a9` }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", margin: 15 }}
                  onPress={() => {
                    const index = data.Budget.findIndex(
                      (bud) => bud.id === item.id
                    );

                    data.addBudgetCat(
                      item.category,
                      item.icon,
                      item.id,
                      item.status,
                      index
                    );
                  }}
                >
                  <MaterialIcons name={item.icon} size={35} color={`#008b8b`} />
                  <Text style={{ marginLeft: 10, marginTop: 10 }}>
                    {item.category}
                  </Text>
                  <View
                    style={{
                      // alignSelf: "center",
                      flexDirection: "column",
                      flex: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    {item.status === true ? (
                      <Entypo name="check" size={24} color={`#008b8b`} />
                    ) : (
                      ""
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default BudgetCategory;
