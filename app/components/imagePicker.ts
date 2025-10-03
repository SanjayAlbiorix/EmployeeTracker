import * as ImagePicker from "expo-image-picker";

const pickImage = async (): Promise<string | null> => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access gallery is required!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  return null;
};

export default pickImage;
