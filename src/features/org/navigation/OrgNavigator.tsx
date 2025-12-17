import React from "react";
import { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrgSelectScreen from "../screens/OrgSelectScreen";
import CreateOrgScreen from "../screens/CreateOrgScreen";
import RoleSelectScreen from "../screens/RoleSelectScreen";

import { OrgStackParamList } from "@/types/navigation";

const Stack = createStackNavigator<OrgStackParamList>();

const OrgNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrgSelect" component={OrgSelectScreen} />
      <Stack.Screen name="CreateOrg" component={CreateOrgScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
    </Stack.Navigator>
  );
};

export default memo(OrgNavigator);
