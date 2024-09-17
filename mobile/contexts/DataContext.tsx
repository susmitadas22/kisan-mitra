import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';
import Axios from "axios";
import { DiseaseReponseType } from "@/types";
import { useLogto } from "@logto/rn";
type DataProviderProps = {
    children: ReactNode;
};

type DataContextType = {
    coords: Location.LocationObjectCoords | null;
    location: Location.LocationGeocodedAddress | null;
    nearbyDiseases: DiseaseReponseType[];
    sub: string | null;
    language: "hi" | "en" | "bn" | "pn"
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
    const [language, setLanguage] = useState<"hi" | "en" | "bn" | "pn">("bn")
    const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null)
    const [nearbyDiseases, setNearbyDiseases] = useState<DiseaseReponseType[]>([])
    const [sub, setSub] = useState<string | null>(null)
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

    }, [coords])

    const value = {
        coords,
        location,
        nearbyDiseases,
        sub,
        language
    }
    if (!coords) return null;
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}