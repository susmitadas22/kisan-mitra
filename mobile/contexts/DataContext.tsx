import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';
import Axios from "axios";
import { DiseaseReponseType, InventoryItemType } from "@/types";
import { useLogto } from "@logto/rn";
import * as SecureStore from 'expo-secure-store';
type DataProviderProps = {
    children: ReactNode;
};

type DataContextType = {
    coords: Location.LocationObjectCoords | null;
    location: Location.LocationGeocodedAddress | null;
    nearbyDiseases: DiseaseReponseType[];
    inventory: InventoryItemType[];
    sub: string | null;
    language: "hi" | "en" | "bn" | "pn"
    setLanguageToSecureStore: (lang: "hi" | "en" | "bn" | "pn") => Promise<void>
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
    const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null)
    const [language, setLanguage] = useState<"hi" | "en" | "bn" | "pn">("en")
    const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null)
    const [nearbyDiseases, setNearbyDiseases] = useState<DiseaseReponseType[]>([])
    const [sub, setSub] = useState<string | null>(null)
    const [inventory, setInventory] = useState<InventoryItemType[]>([])
    async function setLanguageToSecureStore(lang: "hi" | "en" | "bn" | "pn") {
        const language = await SecureStore.setItemAsync("language", lang);
        setLanguage(lang)
    }
    async function getLanguageFromSecureStore() {
        const language = await SecureStore.getItemAsync("language");
        if (!language) {
            await setLanguageToSecureStore("en")
            setLanguage("en")
        }
        setLanguage(language as "hi" | "en" | "bn" | "pn")
    }
    useEffect(() => {
        getLanguageFromSecureStore();
    }, [])

    const { getIdTokenClaims } = useLogto()
    async function getSub() {
        const { sub } = await getIdTokenClaims();
        setSub(sub);
    }
    useEffect(() => {
        getSub();
    }, [])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            let location = await Location.getCurrentPositionAsync({});
            setCoords(location.coords);
        })();
    }, []);

    useEffect(() => {
        //reverse geocode
        if (coords) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
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
            sub
        }).then((res) => {
            setNearbyDiseases(res.data.body)
        })
        Axios.post("http://192.168.232.76:3000/api/v1/inventory", {
            sub
        }).then((res) => {
            setInventory(res.data.body)
        })

    }, [coords])

    const value = {
        coords,
        location,
        nearbyDiseases,
        sub,
        language,
        setLanguage,
        setLanguageToSecureStore,
        inventory
    }
    if (!coords) return null;
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}