import firebaseApp from './FirebaseApp';
import {AsyncStorage} from 'react-native';
import Constants from '../config/Constants';
import UserService from '../Services/UserService';
import FirebaseApp from './FirebaseApp';

export default class ClassService {

    static getReferenceToClassesRoot() {
        return FirebaseApp.database().ref('/classes');
    }

    static getReferenceToClass(classId) {
        return FirebaseApp.database().ref(`/classes/${classId}`);
    }

    static getClass(classId, callback) {
        const classRef = this.getReferenceToClass(classId);
        
        return classRef.on('value', (dataSnap) => {
            callback(dataSnap.val());
        });
    }

    static async addClass(classDetails) {

        const classesRootRef = this.getReferenceToClassesRoot();

        const addClassRes = await classesRootRef.push(classDetails);

        if (addClassRes !== null) {
            UserService.addProfessorClassesOwned(classDetails.teacherId, addClassRes.key, {
                classId: addClassRes.key,
                className: classDetails.className,
                createdAt: classDetails.createdAt,
                updatedAt: classDetails.updatedAt
            }).then(() => {
                return true;
            }).catch((err) => {
                return false;
            });
        }
    }
}
