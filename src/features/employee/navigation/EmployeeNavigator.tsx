import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EmployeeStackParamList } from "@/types/navigation";
import EmployeeListScreen from "../screens/EmployeeListScreen";
import EmployeeProfileScreen from "../screens/EmployeeProfileScreen";
import AddEmployeeScreen from "../screens/AddEmployeeScreen";

const Stack = createStackNavigator<EmployeeStackParamList>();

const EmployeeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="EmployeeList">
      <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
      <Stack.Screen name="EmployeeProfile" component={EmployeeProfileScreen} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
    </Stack.Navigator>
  );
};

export default memo(EmployeeNavigator);
