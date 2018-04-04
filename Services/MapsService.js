import { PermissionsAndroid } from 'react-native';

import { googleMaps } from '../env';
import geolib from 'geolib';

/**
 * Contains methods to interract with Google Maps API.
 */

export default class MapsService {
    static __mapsApiBaseUrlParts = 'https://maps.googleapis.com/maps/api/';

    static async getLatLongFromAddress(street, city, state, zip) {
        const fetchUrl = this.__mapsApiBaseUrlParts + `geocode/json?address=${street},${city},${state},${zip}`
            + `&key=${googleMaps.apiKey}`;

        try {
            console.log(fetchUrl);
            let response = await fetch(fetchUrl);   
            let responseJson = await response.json();
            return responseJson.results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async requestLocationPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'Trackify needs to access your location.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.warn(err)
            return false;
        }
    }

    static getUsersCurrentLocation(callbackFunc) {
        try {
            this.requestLocationPermissions().then(res => {
                if (res) {
                    navigator.geolocation.getCurrentPosition(
                        pos => {
                            callbackFunc(pos);
                        },
                        error => {
                            console.log('Location error');
                            callbackFunc(null);
                        });
                } else {
                    console.log("Denied.");
                    callbackFunc(null);
                }
            })

        } catch(err) {
            console.log("Location error occurred.");
            callbackFunc(null);
        }
    }

    /**
     * Expecting schoCoords and studentCoords to have 'latitude' and 'longitude' keys.
     */
    static isWithinCheckInRange(schCoords, studentCoords, radius) {
        console.log("849827847: ", geolib.getDistance(schCoords, studentCoords));

    }
}