import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyAKisaGkzqHHYGKk4NWb2E-C-sfnHuX3Tc",
    authDomain: "marvel-quiz-37b36.firebaseapp.com",
    projectId: "marvel-quiz-37b36",
    storageBucket: "marvel-quiz-37b36.appspot.com",
    messagingSenderId: "876788273431",
    appId: "1:876788273431:web:3c7a9310eb54a2dff2e752"
  };

class Firebase {
  constructor(){
    app.initializeApp(config);
  }
}
export default Firebase;
