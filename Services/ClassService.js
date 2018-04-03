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

    static async deleteClass(classId) {

        // Remove class from users
        FirebaseApp.database().ref('/users').once('value', snapshot => {
            snapshot.forEach(userSnapshot => {
                const classesOwned = Object.keys(userSnapshot.val().classesOwned);
                if (classesOwned.includes(classId)) {
                    const { userId } = userSnapshot.val();
                    FirebaseApp.database().ref(`/users/${userId}/classesOwned/${classId}`).remove();
                }
            })
        });

        // Remove class from devices
        FirebaseApp.database().ref('/devices').once('value', snapshot => {
            snapshot.forEach(deviceSnapshot => {
                const classesEnrolled = Object.keys(deviceSnapshot.val().classesEnrolled);
                if (classesEnrolled.includes(classId)) {
                    const { key } = deviceSnapshot;
                    FirebaseApp.database().ref(`/devices/${key}/classesEnrolled/${classId}`).remove();
                    // console.log(classId);
                }
            })
        });

        // Remove class from classes
        const classRef = this.getReferenceToClass(classId);
        const delteClassRes = await classRef.remove();

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
                console.log(err);
                return false;
            });
        }
    }

    static async addEditEnrolledStudentToClass(details, mode='addEdit') {
        const enrolledDeviceRoot = this.getReferenceToClass(details.classId).child(`/enrolledStudents/${details.deviceId}`);
        if (mode === 'delete') {
            return await enrolledDeviceRoot.remove().then(() => {
                return DeviceService.addEditDeviceClassesEnrolled(details.deviceId, details.classId, {}, 'delete').then(() => {
                    return true;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
            }).catch(err => {
                console.log(err);
                return false;
            });
         
        } else {
            const { className, classId, ...studentDetails } = details;

            const result = await enrolledDeviceRoot.set(studentDetails);

            if (result !== null) {
                // add/update the class info under the appropriate device root.
                DeviceService.addEditDeviceClassesEnrolled(details.deviceId, details.classId, {
                    classId: details.classId,
                    className: details.className,
                    dateEnrolled: details.createdAt
                }).then(() => {
                    return true;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
            }
        }

       
    }

    static async updateEnrolledStudentData(details) {

        const enrolledStudentRoot = this.getReferenceToClass(details.classId).child(`/enrolledStudents/${details.deviceId}`);

        const {classId, ...studentDetails} = details;
        const result = await enrolledStudentRoot.set(studentDetails);
        return result !== null;
    }

    static getEnrolledStudent(classId, deviceId, callback) {
        const root = this.getReferenceToClass(classId).child(`/enrolledStudents/${deviceId}`);

        return root.on('value', (dataSnap) => {
            callback(dataSnap.val());
        });
    }

    static async addEditUnlinkedStudents(classId, listOfStudents) {
        const unlinedStudentsRef = this.getReferenceToClass(classId).child('/unlinkedStudents');
        const result = await unlinedStudentsRef.set(listOfStudents);

        return result !== null;        
    }
}