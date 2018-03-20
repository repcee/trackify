import { googleMaps } from '../env';

/**
 * Contains methods to interract with Google Maps API.
 */

export default class MapsServic {
    static __mapsApiBaseUrlParts = 'https://maps.googleapis.com/maps/api/';

    static async getLatLongFromAddress(street, city, zip) {
        const fetchUrl = this.__mapsApiBaseUrlParts + `geocode/json?address=${street},${city},${zip}`
            + `&key=${googleMaps.apiKey}`;

        try {
            let response = await fetch(fetchUrl);
            let responseJson = await response.json();
            return responseJson.results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}