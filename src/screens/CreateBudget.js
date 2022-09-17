import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import BudgetContext from "../context/useContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState, useEffect } from "react";

const CreateBudget = ({ navigation }) => {
  const { data } = useContext(BudgetContext);
  const [text, setText] = useState([]);

  const handleChange = (name, value) => {
    // useEffect(() => {
    setText({ ...text, [name]: value });
    // }, []);
  };

  const submit = (text) => {
    data.addBudgetAmount(text);
  };

  navigation.setOptions({
    headerRight: () => (
      <View>
        <Pressable onPress={() => navigation.navigate("Budget")}>
          <Text style={{ color: `#008b8b`, fontSize: 18, fontWeight: "bold" }}>
            Save
          </Text>
        </Pressable>
      </View>
    ),
  });
  const selectedItems = data.Budget.filter((s) => s.status === true);

  return (
    <View>
      <FlatList
        data={selectedItems}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{ borderBottomWidth: 0.5, borderColor: `#a9a9a9` }}>
                <TouchableOpacity style={{ flexDirection: "row", margin: 15 }}>
                  <MaterialIcons name={item.icon} size={35} color={`#008b8b`} />
                  <Text style={{ marginLeft: 10, marginTop: 10 }}>
                    {item.category}
                  </Text>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    <TextInput
                      value={text}
                      defaultValue={item.budget}
                      placeholder="0.0"
                      onChangeText={(text) => handleChange(item.category, text)}
                      onSubmitEditing={() => submit(text)}
                      style={{
                        width: 50,
                      }}
                    ></TextInput>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      ></FlatList>

      <TouchableOpacity onPress={() => navigation.navigate("Category")}>
        <View
          style={{
            backgroundColor: `#008b8b`,
            borderWidth: 2,
            borderRadius: 15,
            height: 50,
            alignItems: "center",
            margin: 30,
            marginTop: 100,
          }}
        >
          <Text style={{ marginTop: 15 }}>Select Category</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBudget;
