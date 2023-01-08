import { useState, useEffect } from 'react';

export function useLatLng(location: string) {
    const [latLng, setLatLng] = useState({ latitude: 0, longitude: 0, deltalatitude: 0, deltalongitude: 0 });

    useEffect(() => {
        let parts = location.split(',');
        let latitude
        let longitude
        let deltalatitude
        let deltalongitude
        let matches = parts[0]?.trim()?.match(/\d+\.\d+/);
        if (matches) {
            latitude = matches[0];
        }

        matches = parts[1]?.trim()?.match(/\d+\.\d+/);
        if (matches) {
            longitude = matches[0];
        }
        matches = parts[2]?.trim()?.match(/\d+\.\d+/);
        if (matches) {
            deltalatitude = matches[0];
        }
        matches = parts[3]?.trim()?.match(/\d+\.\d+/);
        if (matches) {
            deltalongitude = matches[0];
        }

        setLatLng({ latitude: parseFloat(latitude ?? ''), longitude: parseFloat(longitude ?? ''), deltalatitude: parseFloat(deltalatitude ?? ''), deltalongitude: parseFloat(deltalongitude ?? '') });
    }, [location]);

    return latLng;
}