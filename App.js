import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ModalScreen from "./src/screens/AddExpenseModal";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetScreen from "./src/screens/BudgetScreen";
import ChartScreen from "./src/screens/ChartScreen";
import CalenderScreen from "./src/screens/CalenderScreen";
import CreateBudget from "./src/screens/CreateBudget";
import BudgetCategory from "./src/screens/BudgetCategory";
import { TouchableOpacity, Text, Button, View } from "react-native";
const CalenderStack = createNativeStackNavigator();
const BudgetStack = createNativeStackNavigator();
const ChartStack = createNativeStackNavigator();
import { BudgetProvider } from "./src/context/useContext";
//const CreateStack = createNativeStackNavigator();

const AddExpenses = () => {
  return null;
};

function CalenderStackScreen() {
  return (
    <CalenderStack.Navigator>
      <CalenderStack.Screen
        name="Calender"
        component={CalenderScreen}
      ></CalenderStack.Screen>
    </CalenderStack.Navigator>
  );
}

function BudgetStackScreen({ navigation }) {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen
        name="Budget"
        component={BudgetScreen}
      ></BudgetStack.Screen>
      <BudgetStack.Screen
        name="CreateBudget"
        component={CreateBudget}
        /* options={{
          headerRight: () => (
            <TouchableOpacity onPress={navigation.navigate("Budgets")}>
              <Text
                style={{ color: `#008b8b`, fontSize: 18, fontWeight: "bold" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ),
        }}*/
      ></BudgetStack.Screen>
      <BudgetStack.Screen
        name="Category"
        component={BudgetCategory}
      ></BudgetStack.Screen>
    </BudgetStack.Navigator>
  );
}

function ChartStackScreen() {
  return (
    <ChartStack.Navigator>
      <ChartStack.Screen
        name="Chart"
        component={ChartScreen}
      ></ChartStack.Screen>
    </ChartStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <BudgetProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Calenders"
            component={CalenderStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <FontAwesome name="calendar" size={24} color="black" />
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Charts"
            component={ChartStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <AntDesign name="areachart" size={24} color="black" />
              ),
            }}
          ></Tab.Screen>

          <Tab.Screen
            name="Add Expenses"
            component={AddExpenses}
            options={{
              tabBarButton: () => <ModalScreen></ModalScreen>,
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Budgets"
            component={BudgetStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="finance"
                  size={24}
                  color="black"
                />
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </BudgetProvider>
    </NavigationContainer>
  );
}
