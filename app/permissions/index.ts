import { Alert, Linking } from "react-native";
import * as MediaLibrary from "expo-media-library";

export type PermissionsTypes = "MEDIA_LIBRARY";

const RESULTS = {
  GRANTED: "granted",
  DENIED: "denied",
  BLOCKED: "blocked",
  UNDETERMINED: "undetermined",
};

const ExpoPermissionRegistry: any = {
  MEDIA_LIBRARY: {
    get: MediaLibrary.getPermissionsAsync,
    request: MediaLibrary.requestPermissionsAsync,
  },
};

export const handlePermission = (permissionName: PermissionsTypes) => {
  return new Promise<boolean>(async (resolve) => {
    const registry = ExpoPermissionRegistry[permissionName];
    if (!registry) {
      resolve(false);
      return;
    }

    // Step 1: Check current status
    let { status } = await registry.get();

    // Step 2: If undetermined or denied, request permission
    if (status === RESULTS.UNDETERMINED || status === RESULTS.DENIED) {
      const res = await registry.request();
      status = res.status;
    }

    // Step 3: Handle permanently blocked
    if (status === RESULTS.BLOCKED) {
      Alert.alert(
        `${permissionName} Permission Needed`,
        `You have permanently denied ${permissionName} permission. Please enable it from app settings.`,
        [
          { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
          {
            text: "Allow",
            onPress: () => {
              Linking.openSettings();
              resolve(false); // resolve false because user hasn’t granted yet
            },
          },
        ]
      );
      return;
    }

    // Step 4: Permission granted
    if (status === RESULTS.GRANTED) {
      resolve(true);
      return;
    }

    // Step 5: Permission denied after request
    resolve(false);
  });
};
