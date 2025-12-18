import React from "react";
import { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrgSelectScreen from "../screens/OrgSelectScreen";
import CreateOrgScreen from "../screens/CreateOrgScreen";
import JoinOrgScreen from "../screens/JoinOrgScreen";
import { useRoleStore } from "@/store/roleStore";


import { OrgStackParamList } from "@/types/navigation";

const Stack = createStackNavigator<OrgStackParamList>();

const OrgNavigator = () => {
  const role = useRoleStore((state) => state.role);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'admin' ? (
        <>
            <Stack.Screen name="OrgSelect" component={OrgSelectScreen} />
            <Stack.Screen name="CreateOrg" component={CreateOrgScreen} />
        </>
      ) : (
        <Stack.Screen name="JoinOrg" component={JoinOrgScreen} />
      )}
    </Stack.Navigator>
  );
};

export default memo(OrgNavigator);
