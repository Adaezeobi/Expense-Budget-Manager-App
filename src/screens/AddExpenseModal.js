import React from "react";
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import Moment from "moment";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { useState, useContext } from "react";
import BudgetContext from "../context/useContext";
import DateTimePicker from "react-native-modal-datetime-picker";

const ModalScreen = (navigation) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [toggle, setToggle] = useState(true);
  const { data } = useContext(BudgetContext);
  const [modalVisibles, setmodalVisibles] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [val, changeval] = useState("");

  const expenseDATA = data.Budget.filter((data) => data.income === undefined);
  const incomeDATA = data.Budget.filter((data) => data.income === "");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setmodalVisible(true)}
      >
        <View
          style={{
            marginTop: -30,
            backgroundColor: `#008b8b`,
            borderColor: "white",
            shadowOffset: { width: 2, height: 2 },
            shadowColor: "#999",
            shadowOpacity: 0.5,
            borderRadius: 1000,
            width: 52,
            height: 52,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="add" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View>
        <Modal
          visible={modalVisible}
          //onBackdropPress={() => setmodalVisible(false)}
          backdropOpacity={0.5}
          backdropColor={"grey"}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View style={styles.content}>
            <View
              style={
                toggle
                  ? styles.ModalinputviewExpense
                  : styles.ModalinputviewIncome
              }
            >
              <View style={{ top: 10 }}>
                <TouchableOpacity
                  onPress={() => setmodalVisible(false)}
                  style={{ alignSelf: "flex-start" }}
                >
                  <MaterialIcons name="cancel" size={28} color="white" />
                </TouchableOpacity>
              </View>

              <View
                style={{ alignSelf: "flex-end", marginRight: 10, bottom: 21 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    data.addExpense(
                      category,
                      val,
                      Moment(selectedDate).format("YYYY-MM-DD"),
                      toggle
                    ),
                      setCategory(""),
                      changeval(""),
                      setmodalVisible(false);
                  }}
                >
                  <Octicons name="check" size={28} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.Expenseincomebuttonview}>
                <Pressable
                  style={
                    toggle
                      ? styles.Expenceincomebuttonpressed
                      : styles.Expenceincomebutton
                  }
                  onPress={() => {
                    setToggle(true);
                    setCategory("");
                    changeval("");
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
                    setCategory("");
                    changeval("");
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
              <TouchableOpacity
                style={styles.Expensecategory}
                onPress={() => setmodalVisibles(true)}
              >
                <MaterialIcons name="category" size={30} color="white" />
                <Text style={styles.ExpensecategoryText}>Category</Text>
                <Text> {category}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.ExpenseInput}
                placeholder={"0.0"}
                value={val}
                onChangeText={(text) => changeval(text)}
              ></TextInput>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                marginTop: 10,
                height: 40,
                borderColor: "#a9a9a9",
              }}
            >
              <TouchableOpacity onPress={showDatePicker}>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome name="calendar-o" size={24} color={`#a9a9a9`} />
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 2,
                      color: toggle ? `#cd5c5c` : `#32cd32`,
                    }}
                  >
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "No Date Selected"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Modal
            visible={modalVisibles}
            onBackdropPress={() => setmodalVisibles(false)}
            style={{ justifyContent: "flex-end", margin: 0 }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: 500,

                borderWidth: 1,
                borderColor: "grey",
              }}
            >
              <FlatList
                data={toggle ? expenseDATA : incomeDATA}
                numColumns={2}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View
                        style={{
                          alignContent: "space-around",
                        }}
                      >
                        <TouchableOpacity
                          style={{ flexDirection: "row", margin: 15 }}
                          onPress={() => {
                            setmodalVisibles(false), setCategory(item.category);
                          }}
                        >
                          <MaterialIcons
                            name={item.icon}
                            size={35}
                            color={toggle ? `#cd5c5c` : `#32cd32`}
                          />
                          <Text style={{ marginLeft: 10, marginTop: 10 }}>
                            {item.category}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              ></FlatList>
            </View>
          </Modal>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    height: 700,

    borderWidth: 1,
    borderColor: "grey",

    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },

  ModalinputviewExpense: {
    backgroundColor: `#cd5c5c`,
    height: 200,

    alignSelf: "stretch",

    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    justifyContent: "center",
    flexDirection: "column",
  },
  ModalinputviewIncome: {
    backgroundColor: `#32cd32`,
    height: 200,

    alignSelf: "stretch",

    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    justifyContent: "center",
    flexDirection: "column",
  },
  ExpenseInput: {
    width: 100,
    height: 50,
    fontSize: 50,

    alignSelf: "flex-end",
  },
  Expensecategory: {
    flexDirection: "row",
    top: 40,
  },
  ExpensecategoryText: {
    color: "white",
  },
  Expenceincomebutton: {
    width: 100,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
  Expenseincomebuttonview: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 0.5,
    backgroundColor: `#a9a9a9`,
    borderRadius: 15,
    bottom: 15,
  },
  Expenceincomebuttonpressed: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default ModalScreen;
