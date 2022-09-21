import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import BudgetContext from "../context/useContext";
import * as Progress from "react-native-progress";

const BudgetScreen = ({ navigation }) => {
  const { data } = useContext(BudgetContext);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("CreateBudget")}>
        <Ionicons name="add" size={30} color={`#008b8b`} />
      </TouchableOpacity>
    ),
  });

  const Budget = data.Budget.filter((B) => B.budget > parseFloat("0"));

  console.log(Budget);

  return (
    <View>
      <FlatList
        data={Budget}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{ borderBottomWidth: 0.5, borderColor: `#a9a9a9` }}>
                <TouchableOpacity style={{ flexDirection: "row", margin: 15 }}>
                  <MaterialIcons name={item.icon} size={35} color={`#008b8b`} />
                  <View
                    style={{
                      flexDirection: "column",
                      borderWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                    >
                      {item.category}
                    </Text>
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        bottom: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {+item.budget - item.value} left
                    </Text>
                    <Text style={{ color: "grey" }}>
                      {item.value} of {item.budget}
                    </Text>

                    <Progress.Bar
                      progress={item.value / +item.budget}
                      width={300}
                      color={`#008b8b`}
                      height={10}
                      unfilledColor={`#a9a9a9`}
                    />
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

export default BudgetScreen;
