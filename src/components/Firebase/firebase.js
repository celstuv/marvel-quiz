import app from 'firebase/app';
/*Importer les fonctionnalités de l'api*/
import 'firebase/auth';
import 'firebase/firestore';


const Config = {
    apiKey: process.env.REACT_FIREBASE_API_KEY,
    authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.envREACT_FIREBASE_APP_ID
  };

class Firebase {
    constructor() {
      app.initializeApp(Config);
      this.auth = app.auth();
      this.db = app.firestore();
    }

    //Inscription
    signupUser = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

    //connexion
    loginUser = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

    /*Deconnexion*/
    signoutUser = () => this.auth.signOut();

    /*Récupérer le Password*/
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.doc(`users/${uid}`);

}

export default Firebase;
