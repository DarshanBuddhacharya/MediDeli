import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useLocation = () => {
    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            pos => {
                setPosition({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                });
            },
            error =>
                Alert.alert("GetCurrentPosition Error", JSON.stringify(error)),
            { enableHighAccuracy: true },
        );
    };

    const [position, setPosition] = useState<{ lat: number; long: number }>();
    useEffect(() => {
        getCurrentPosition();
    }, []);

    return { position, getCurrentPosition };
};
