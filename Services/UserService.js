import { AsyncStorage, Platform } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from '../env';

export default class UserService {

    static async getUserType() {
        return await AsyncStorage.getItem('trackifyUserType');
    }

    static async removeUserType() {
        try {
            await AsyncStorage.removeItem('trackifyUserType');
        } catch (error) {
            console.log(error);
        }
    }

    static async setUserType(userType) {
        try {
            await AsyncStorage.setItem('trackifyUserType', userType);
        } catch (error) {
            console.log(error);
        }
    }

    static updateDevice = (deviceId, firstName, lastName, userType) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.database().ref('devices/' + deviceId).set({
            deviceId, firstName, lastName, userType
        })
        .then(res => res)
        .catch(err => err);
    }

    static getUserInfoFromDeviceId = (deviceId) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        const ref = firebaseApp.database().ref('devices');
        return new Promise((resolve, reject)=> {
            ref.orderByChild('deviceId').equalTo(deviceId).on('value', snapshot => {
                snapshot.exists() ? resolve(snapshot.val()[Object.keys(snapshot.val())[0]]) : reject('User not found');
            })
        });
    }

    static getListOfUsers = () => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        const ref = firebaseApp.database().ref('devices');
        return new Promise((resolve, reject)=> {
            ref.orderByChild('deviceId').on('value', snapshot => {
                snapshot.exists() ? resolve(Object.values(snapshot.val())) : reject('No users exists');
            })
        });
    }

}
