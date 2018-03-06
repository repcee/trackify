import * as firebase from 'firebase';
import { firebaseConfig } from '../env';

export default class AuthServiceOld {

    static authLogin = (email, password) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.auth().signInWithEmailAndPassword(email, password);
    }

    static getAuthRef = (email, password) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.auth();
    }

    static getEmail = (username) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        const ref = firebaseApp.database().ref('users');
        return new Promise((resolve, reject)=> {
            ref.orderByChild('username').equalTo(username).on('value', snapshot => {
                snapshot.exists() ? resolve(snapshot.val()[Object.keys(snapshot.val())[0]].email) : reject('User does not exist');
            })
        });
    }

    static register = (email, password) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    }

    static gerCurrentUser = () => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.auth().gerCurrentUser;
    }

    static updateUser = (userId, userInfo) => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        return firebaseApp.database().ref('users/' + userId).set({
            userId: userId,
            username: userInfo.username,
            name: userInfo.name,
            email: userInfo.email,
        }).then(res => console.log(res)).catch(err => console.log(err));
    }

    static signOut = () => {
        const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        firebaseApp.auth().signOut()
            .then(res => console.log('sign out successful :' + res))
            .catch(err => console.log('sign out error: ' + err));
    }
}