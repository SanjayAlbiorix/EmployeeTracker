import React, { memo } from "react";
import { View } from "react-native";
import Text from "@/ui/components/Text";
import { useRoleStore } from "@/store/roleStore";

type Props = {
  children: React.ReactNode;
};

const RequireAdmin: React.FC<Props> = ({ children }) => {
  const role = useRoleStore((s) => s.role);

  if (role !== "admin") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You do not have permission to access this screen.</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default memo(RequireAdmin);
