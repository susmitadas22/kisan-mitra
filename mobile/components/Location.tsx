import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function LocationComponent() {
    const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null);
    const [coords, setCoords] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCoords(location);
        })();
    }, []);
    useEffect(() => {
        //reverse geocode
        if (coords) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let location = await Location.reverseGeocodeAsync(coords.coords);
                setLocation(location[0]);
            })();
        }
    }, [coords]);


    return (
        <View>
            <ThemedText>{JSON.stringify(location)} </ThemedText>
        </View>
    );
}

