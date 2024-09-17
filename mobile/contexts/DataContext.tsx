import { DiseaseReponseType, InventoryItemType } from "@/types";
import { useLogto } from "@logto/rn";
import Axios from "axios";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform } from "react-native";

import Constants from "expo-constants";
type DataProviderProps = {
  children: ReactNode;
};

type DataContextType = {
  coords: Location.LocationObjectCoords | null;
  location: Location.LocationGeocodedAddress | null;
  nearbyDiseases: DiseaseReponseType[];
  inventory: InventoryItemType[];
  sub: string | null;
  language: "hi" | "en" | "bn" | "pn" | "as";
  setLanguageToSecureStore: (
    lang: "hi" | "en" | "bn" | "pn" | "as"
  ) => Promise<void>;
  weather: any;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}
async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}

export function DataProvider({ children }: DataProviderProps) {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null
  );
  const [language, setLanguage] = useState<"hi" | "en" | "bn" | "pn" | "as">(
    "en"
  );
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [nearbyDiseases, setNearbyDiseases] = useState<DiseaseReponseType[]>(
    []
  );
  const [sub, setSub] = useState<string | null>(null);
  const [inventory, setInventory] = useState<InventoryItemType[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [_, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function setLanguageToSecureStore(
    lang: "hi" | "en" | "bn" | "pn" | "as"
  ) {
    await SecureStore.setItemAsync("language", lang);
    setLanguage(lang);
  }
  async function getLanguageFromSecureStore() {
    const language = await SecureStore.getItemAsync("language");
    if (!language) {
      await setLanguageToSecureStore("en");
      setLanguage("en");
    }
    setLanguage(language as "hi" | "en" | "bn" | "pn" | "as");
  }
  useEffect(() => {
    getLanguageFromSecureStore();
  }, []);

  const { getIdTokenClaims } = useLogto();
  async function getSub() {
    const { sub } = await getIdTokenClaims();
    setSub(sub);
  }
  useEffect(() => {
    getSub();
  }, []);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      setCoords(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (coords) {
      (async () => {
        await Location.requestForegroundPermissionsAsync();
        let location = await Location.reverseGeocodeAsync(coords);
        setLocation(location[0]);
      })();
    }
  }, [coords]);

  useEffect(() => {
    if (!coords) return;
    Axios.post("http://192.168.232.76:3000/api/v1/nearby", {
      lat: coords?.latitude,
      lng: coords?.longitude,
      sub,
    }).then((res) => {
      setNearbyDiseases(res.data.body);
    });
    Axios.post("http://192.168.232.76:3000/api/v1/inventory", {
      sub,
    }).then((res) => {
      setInventory(res.data.body);
    });
    Axios.post("http://192.168.232.76:3000/api/v1/user", {
      sub,
      lat: coords?.latitude,
      lng: coords?.longitude,
      token: expoPushToken,
    }).then((res) => {
      setNotification(res.data.body);
    });
    Axios.get("http://192.168.232.76:3000/api/v1/weather", {
      params: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
    }).then((res) => {
      setWeather(res.data.body);
    });
  }, [coords]);

  const value = {
    coords,
    location,
    nearbyDiseases,
    sub,
    language,
    setLanguage,
    setLanguageToSecureStore,
    inventory,
    weather,
  };
  if (!coords) return null;
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
