import app from 'firebase/app';
import 'firebase/auth';

const Config = {
    apiKey: "AIzaSyAKisaGkzqHHYGKk4NWb2E-C-sfnHuX3Tc",
    authDomain: "marvel-quiz-37b36.firebaseapp.com",
    projectId: "marvel-quiz-37b36",
    storageBucket: "marvel-quiz-37b36.appspot.com",
    messagingSenderId: "876788273431",
    appId: "1:876788273431:web:3c7a9310eb54a2dff2e752"
  };

class Firebase {
    constructor() {
      app.initializeApp(Config);
      this.auth = app.auth();
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

}

export default Firebase;
