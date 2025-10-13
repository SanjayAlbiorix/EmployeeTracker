import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = async () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (er: any) {
        setErrorMsg(er);
      }
    })();
  }, []);

  return { location, errorMsg };
};

export default useLocation;
