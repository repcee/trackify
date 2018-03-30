import UserService from '../Services/UserService';
import DeviceService from '../Services/DeviceService';
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

        // Add to the professor's list
        if (addClassRes !== null) {
            UserService.addEditProfessorClassesOwned(classDetails.teacherId, addClassRes.key, {
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

    static async updateClass(classId, classDetails) {

        const classRoot = this.getReferenceToClassesRoot().child(`/${classId}`);

        const classRes = await classRoot.set(classDetails);

        if (classRes !== null) {
            UserService.addEditProfessorClassesOwned(classDetails.teacherId, classId, {
                classId: classId,
                className: classDetails.className,
                updatedAt: classDetails.updatedAt
            }).then(() => {
                return true;
            }).catch((err) => {
                return false;
            });
        }
    }


    static async addEditEnrolledStudentToClass(details) {

        const enrolledStudentRoot = this.getReferenceToClass(details.classId).child(`/enrolledStudents/${details.deviceId}`);

        const {className, classId, ...studentDetails} = details;

        const result = await enrolledStudentRoot.set(studentDetails);

        if (result !== null) {
            // add/update the class info under the appropriate device root.
            DeviceService.addEditDeviceClassesEnrolled(details.deviceId, details.classId, {
                classId: details.classId,
                className: details.className,
                dateEnrolled: details.createdAt
            }).then(() => {
                return true;
            }).catch((err) => {
                return false;
            });
        }
    }

    static async addEditUnlinkedStudents(classId, listOfStudents) {
        const unlinedStudentsRef = this.getReferenceToClass(classId).child('/unlinkedStudents');
        const result = await unlinedStudentsRef.set(listOfStudents);

        return result !== null;        
    }
}