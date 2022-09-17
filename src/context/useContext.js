import React from "react";
import { useReducer } from "react";

const BudgetContext = React.createContext();
const category = [
  {
    category: "Groceries",
    icon: "local-grocery-store",
    status: false,
    // budget: "0",
    value: 0,
    // expense: ["150"],
    date: "",
  },

  {
    category: "Food",
    icon: "food-bank",
    status: false,
    value: 0,
    date: "",
    //  budget: "0",
  },
  {
    category: "Savings",
    icon: "attach-money",
    status: false,
    value: 0,
    date: "",
  },
  {
    category: "Gifts",
    icon: "card-giftcard",
    status: false,
    value: 0,
    date: "",
  },
  {
    category: "Cabs",
    icon: "local-taxi",
    status: false,
    value: 0,
    date: "",
  },
  {
    category: "Health & Fitness",
    icon: "fitness-center",
    status: false,
    value: 0,
    date: "",
  },
  {
    category: "Entertainment",
    icon: "videogame-asset",
    status: false,
    value: 0,
    date: "",
  },
  {
    category: "Tithe",
    icon: "money",
    status: false,
    value: 0,
    date: "",
  },

  {
    category: "Skin Care",
    icon: "face-retouching-natural",
    status: false,
    value: 0,
    date: "",
  },
  {
    category: "Salary",
    income: "",
    icon: "account-balance",
    value: 0,
    date: "",
  },
  {
    category: "Others",
    income: "",
    icon: "stars",
    value: 0,
    date: "",
  },
  {
    category: "Bonus",
    income: "",
    icon: "monetization-on",
    value: 0,
    date: "",
  },
];

const initialBudget = category.map((cat) => {
  return {
    ...cat,
    id: Math.floor(Math.random() * 99999),
  };
});

const Reducer = (state, action) => {
  switch (action.type) {
    case "add_budgetcategory":
      state[action.payload.index] = {
        category: action.payload.category,
        icon: action.payload.icon,
        id: action.payload.id,
        status: !action.payload.status,
        budget: 0,
        value: 0,
        date: "",
      };

      return [...state];

    case "add_budgetAmount":
      Object.keys(action.payload).forEach((st) => {
        const item = state.findIndex((s) => {
          return s.category === st;
        });
        return (state[item] = { ...state[item], budget: action.payload[st] });
      });

      return [...state];

    case "add_Expense":
      const findBudget = state.find(
        (st) => st.category === action.payload.category
      );
      const Item = state.findIndex(
        (st) => st.category === action.payload.category
      );

      state[Item] = {
        ...state[Item],
        value: (findBudget.value += +action.payload.value),
      };
      return [
        ...state,

        {
          category: action.payload.category,
          value: action.payload.value,
          date: action.payload.date,
          id: action.payload.id,
          icon: findBudget.icon,
          income: action.payload.toggle,
          //budget: findBudget.budget,
        },
      ];

    default:
      return state;
  }
};

export const BudgetProvider = ({ children }) => {
  const [Budget, dispatch] = useReducer(Reducer, initialBudget);
  console.log(Budget);
  const addBudgetCat = (category, icon, id, status, index) => {
    dispatch({
      type: "add_budgetcategory",
      payload: {
        category: category,
        icon: icon,
        id: id,
        status: status,
        index: index,
      },
    });
  };

  const addBudgetAmount = (obj) => {
    dispatch({
      type: "add_budgetAmount",
      payload: obj,
    });
  };

  const addExpense = (category, value, date, toggle) => {
    dispatch({
      type: "add_Expense",
      payload: {
        category: category,
        value: value,
        date: date,
        id: Math.floor(Math.random() * 99999),
        toggle: !toggle,
      },
    });
  };
  return (
    <BudgetContext.Provider
      value={{ data: { Budget, addBudgetCat, addBudgetAmount, addExpense } }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
