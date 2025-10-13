import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocationWatch = async () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 0,
          distanceInterval: 0,
        },
        (loc) => {
          console.log("location", loc);

          setLocation(loc);
        }
      );
    })();

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return { location, errorMsg };
};

export default useLocationWatch;
