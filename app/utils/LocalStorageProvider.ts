import AsyncStorage from "@react-native-async-storage/async-storage";

class localStorageProvider {
  async setItemString(key: any, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error");
    }
  }

  async getItemString(key: any) {
    let item = await AsyncStorage.getItem(key);
    return item;
  }

  async setItemObject(key: any, item: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.log("Error", error);
    }
  }

  async getItemObject(key: any) {
    let item: any = await AsyncStorage.getItem(key);
    return JSON.parse(item);
  }

  async removeItem(key: any) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error: any) {
      console.log("Error " + error.value);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error: any) {
      console.log("Error " + error.value);
    }
  }
}

export const localSystemStorage = new localStorageProvider();
