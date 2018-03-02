import * as firebase from 'firebase';
import { firebaseConfig } from '../env';

export default class DeviceService {

    static updateDevice = (deviceId, userInfo) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.database().ref('devices/' + deviceId).set({
            deviceId: deviceId,
            firstName: userInfo.firstName,
            latName: userInfo.lastName
        }).then(res => console.log(res)).catch(err => console.log(err));
    }
    
}