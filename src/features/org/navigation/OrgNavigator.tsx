import React from "react";
import { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrgSelectScreen from "../screens/OrgSelectScreen";
import CreateOrgScreen from "../screens/CreateOrgScreen";
import JoinOrgScreen from "../screens/JoinOrgScreen";
import { EmployeePendingApprovalScreen } from "../screens/EmployeePendingApprovalScreen";
import { useRoleStore } from "@/store/roleStore";
import { useOrgStore } from "@/store/orgStore";


import { OrgStackParamList } from "@/types/navigation";

const Stack = createStackNavigator<OrgStackParamList>();

const OrgNavigator = () => {
  const role = useRoleStore((state) => state.role);
  const organizations = useOrgStore((state) => state.organizations);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Show Org Selection if user is Admin OR if they already have organizations (and somehow ended up here w/o orgId) */}
      {role === 'admin' || organizations.length > 0 ? (
        <>
            <Stack.Screen name="OrgSelect" component={OrgSelectScreen} />
            <Stack.Screen name="CreateOrg" component={CreateOrgScreen} />
        </>
      ) : (
        <>
        <Stack.Screen name="JoinOrg" component={JoinOrgScreen} />
        <Stack.Screen name="EmployeePendingApproval" component={EmployeePendingApprovalScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default memo(OrgNavigator);
