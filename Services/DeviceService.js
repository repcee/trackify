import UserService from '../Services/UserService';
import FirebaseApp from './FirebaseApp';

export default class DeviceService {

    static getReferenceToDevicesRoot() {
        return FirebaseApp.database().ref('/devices');
    }

    static getReferenceToDevice(deviceId) {
        return FirebaseApp.database().ref(`/devices/${deviceId}`);
    }

    static getDevice(deviceId, callback) {
        const deviceRef = this.getReferenceToDevice(deviceId);

        return deviceRef.on('value', (dataSnap) => {
            callback(dataSnap.val());
        });
    }

    static async addDevice(deviceDetails) {
        const devicesRootRef = this.getReferenceToDevice(deviceDetails.deviceId);
        const addDeviceRes = await devicesRootRef.set(deviceDetails);
        return addDeviceRes !== null;
    }

  
    static async addEditDeviceClassesEnrolled(deviceId, classId, classData) {
        const enrolledClassRoot = this.getReferenceToDevice(deviceId).child(`/classesEnrolled/${classId}`);
        return await enrolledClassRoot.set(classData).then(() => {
            return true;
        }).catch((err) => {
            return false;
        });
    }



    // static updateDevice = (deviceId, userInfo) => {
    //     const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    //     return firebaseApp.database().ref('devices/' + deviceId).set({
    //         deviceId: deviceId,
    //         firstName: userInfo.firstName,
    //         latName: userInfo.lastName
    //     }).then(res => console.log(res)).catch(err => console.log(err));
    // }

}