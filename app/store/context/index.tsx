import React, { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  count: number;
}

type Action =
  | { type: "INCREASE" }
  | { type: "DECREASE" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

const initialState: AppState = {
  count: 0,
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "INCREASE":
      return { ...state, count: state.count + 1 };
    case "DECREASE":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "SET":
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("appState");
      if (saved) {
        dispatch({ type: "SET", payload: JSON.parse(saved).count });
      }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
