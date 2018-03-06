import * as firebase from 'firebase';
import { firebaseConfig } from '../env';

const FirebaseApp =  firebase.apps.length ? firebase.app(): firebase.initializeApp(firebaseConfig);

export default FirebaseApp;
