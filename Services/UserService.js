import firebaseApp from './FirebaseApp';
import {AsyncStorage} from 'react-native';
import Constants from '../config/Constants';
import { utc } from 'moment';
import FirebaseApp from './FirebaseApp';

export default class UserService {

    static async getUserType() {
        return await AsyncStorage.getItem('trackifyUserType');
    }

    static async removeUserType() {
        try {
            await AsyncStorage.removeItem('trackifyUserType');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async setUserType(setToProfessor = false) {
        try {
            const uType = setToProfessor ? Constants.userType.professor :
                Constants.userType.student;

            await AsyncStorage.setItem('trackifyUserType', uType);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static getReferenceToUser(userId) {
        return FirebaseApp.database().ref(`/users/${userId}`);
    }

    /** 
     * Returns the data associated with a user.
    */
    static getUserData(userId) {
        const userRef = this.getReferenceToUser(userId);
        return new Promise((resolve, reject) => {
            userRef.once('value', (snap) => {
                if (!snap) {
                    reject(null);
                } else {
                    resolve(snap.val());
                }
            });
        });
    }


    static async updateUser(userId, updateData) {
        const userRef = this.getReferenceToUser(userId);
        return await userRef.update(updateData, (err) => {
            if (err)
                return false;
            return true;
        });
    }

    static async addEditProfessorClassesOwned(userId, classId, classData) {
        const classesOwnedRoot = this.getReferenceToUser(userId).child(`/classesOwned/${classId}`);

        return await classesOwnedRoot.set(classData).then(() => {
            return true;
        }).catch((err) => {
            return false;
        });
    }

   
    // static updateDevice = (deviceId, firstName, lastName, userType) => {
    //     const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    //     return firebaseApp.database().ref('devices/' + deviceId).set({
    //         deviceId, firstName, lastName, userType
    //     })
    //     .then(res => res)
    //     .catch(err => err);
    // }

    // static getUserInfoFromDeviceId = (deviceId) => {
    //     const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    //     const ref = firebaseApp.database().ref('devices');
    //     return new Promise((resolve, reject)=> {
    //         ref.orderByChild('deviceId').equalTo(deviceId).on('value', snapshot => {
    //             snapshot.exists() ? resolve(snapshot.val()[Object.keys(snapshot.val())[0]]) : reject('User not found');
    //         })
    //     });
    // }

    // static getListOfUsers = () => {
    //     const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    //     const ref = firebaseApp.database().ref('devices');
    //     return new Promise((resolve, reject)=> {
    //         ref.orderByChild('deviceId').on('value', snapshot => {
    //             snapshot.exists() ? resolve(Object.values(snapshot.val())) : reject('No users exists');
    //         })
    //     });
    // }

}
