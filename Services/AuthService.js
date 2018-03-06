import FirebaseApp from './FirebaseApp';
import Utils from '../config/Utils';

/** 
 * Provides authentication services through firebase.
*/
export default class AuthService {
    // Holds reference to an instance of the firebase app.
    _firebaseAppInstance = null;

    // Holds reference to an instance of the firebase auth service.
    _authInstance = null;

    constructor() {
        this._firebaseAppInstance = FirebaseApp;
        this._authInstance = this._firebaseAppInstance.auth();
    }
    

    // Returns an instance of the firebase auth service.
    getAuthInstance = () => {
        return this._authInstance;
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
    notifyOnAuthStateChanged = (authCallback) => {
        return this._authInstance.onAuthStateChanged((user) => {
            authCallback(user);
        });
    }

    /**
     * Signs in a user given an email and password.
     * Returns a Promise to return a message about the sign in process.
     * The user object is not returned here, setup notifyOnAuthStateChanged first.
     */
    signInUser = (email, password) => {
        return new Promise((resolve, reject) => {
            this._authInstance.signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve("Sign In was successful.");
            })
            .catch( (error) => {
                reject(error.message);
            });
        });
    }

    /**
     * Signs out the current user.
     * Returns a Promise to return a message about the sign out process.
     * Will trigger notifyOnAuthStateChanged will a null parameter.
     */
    signOutCurrentUser = () => {
        return new Promise((resolve, reject) => {
            this._authInstance.signOut()
            .then(() => {
                resolve("Signed Out Successfully.");
            })
            .catch( (error) => {
                reject(error.message);
            });
        });
    }
}
