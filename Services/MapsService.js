import { googleMaps } from '../env';

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
}