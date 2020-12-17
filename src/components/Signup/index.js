import React, {useState, useContext} from 'react';
/*import ReactDOM from 'react-dom';*/
import {Link} from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const Signup = (props) => {
/*console.log(props);*/

/*Instancier les methodes de firebases via index.js du dossier Firebase*/
  const firebase = useContext(FirebaseContext);
  /*console.log(firebase);*/

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setLoginData] = useState(data);
  /*console.log(loginData);*/
  const [error, setError] = useState('');

  const handleChange = (e) => {
    /*Copie du initial de data equivaut à slice*/
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, pseudo } = loginData;
    /*Utilisation de l'API*/
     firebase.signupUser(email, password)
     .then( authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
     })
     /*inscription ok, on vide le form*/
      .then(() => {
          /*On vide les champs*/
           setLoginData({...data});
           props.history.push('/welcome');
           })
      .catch(error => {
            setError(error);
            setLoginData({...data});
          })
  }

  /*Destructuring*/
  const {pseudo, email, password, confirmPassword} = loginData;

  /*Vérification du formulaire*/
  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled="disabled">Inscription</button>
    : <button>Inscription</button>

  /*gestion des erreurs*/
  const errorMsg = error !== '' && <span>{error.message}</span>;

  return (<div className="signUpLoginBox">
    <div className="slContainer">
      <div className="formBoxLeftSignup"></div>
      <div className="formBoxRight">
        <div className="formContent">
          {errorMsg}
          <h2>Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required/>
              <label htmlFor="pseudo">Pseudo</label>
            </div>
            <div className="inputBox">
              <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputBox">
              <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="inputBox">
              <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required/>
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            {btn}
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/login">Déja inscrit? Connectez-vous</Link>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
export default Signup;
