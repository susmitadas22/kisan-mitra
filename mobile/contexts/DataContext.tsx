import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';
type DataProviderProps = {
    children: ReactNode;
};

type DataContextType = {
    coords: Location.LocationObjectCoords | null;
    location: Location.LocationGeocodedAddress | null;
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
    const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null)

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

    const value = {
        coords,
        location
    }
    if (!coords) return null;
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}