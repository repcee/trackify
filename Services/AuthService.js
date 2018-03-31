import FirebaseApp from './FirebaseApp';
import Utils from '../config/Utils';

/** 
 * Provides authentication services through firebase.
*/
export default class AuthService {

    // Returns an instance of the firebase auth service.
    static getAuthInstance() {
        return FirebaseApp.auth();
    }


    /**
     * Use this method on all pages that need information
     * about the current (signed-in) user
     * @param authCallback method to call when the auth state changes.
     * 
     * @returns The unsubscribe function for the observer. Typically want to involk this in componentDidUnmount
     * @link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
     * 
     */
    static notifyOnAuthStateChanged(authCallback) {
        return FirebaseApp.auth().onAuthStateChanged((user) => {
            authCallback(user);
        });
    }

    /**
     * Signs in a user given an email and password.
     * Returns a Promise to return a message about the sign in process.
     * The user object is not returned here, setup notifyOnAuthStateChanged first.
     */
    static signInUser(email, password) {
        return new Promise((resolve, reject) => {
            FirebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch( (error) => {
                console.log("si: ", Utils.formatFirebaseMessage(error.message));
                reject(Utils.formatFirebaseMessage(error.message));
            });
        });

        // return FirebaseApp.auth().signInWithEmailAndPassword(email, password)
        //     .then((ss) => {
        //         console.log("res")
        //         // resolve(ss);
        //     })
        //     .catch((error) => {
        //         console.log("rej: ", Utils.formatFirebaseMessage(error.message));
        //         // reject(Utils.formatFirebaseMessage(error.message));
        // });
    }

    static createUser(email,password){
        return new Promise((resolve, reject) => {
            FirebaseApp.auth().createUserWithEmailAndPassword(email,password)
                .catch ((error) =>{
                    console.log("si: ", Utils.formatFirebaseMessage(error.message));
                    reject(Utils.formatFirebaseMessage(error.message))
                });
        });
    }

    /**
     * Signs out the current user.
     * Returns a Promise to return a message about the sign out process.
     * Will trigger notifyOnAuthStateChanged will a null parameter.
     */
    static signOutCurrentUser() {
        return new Promise((resolve, reject) => {
            FirebaseApp.auth().signOut()
                .then(() => {
                    resolve("Signed Out Successfully.");
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
}
