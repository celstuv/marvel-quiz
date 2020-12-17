import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const ForgetPassword = (props) => {

  const Firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  /*console.log(email);*/
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    Firebase.passwordReset(email)
    .then(()=> {
      setError(null);
      setSuccess(`Your new password has been send ! Check your emailBox ${email}`);
      setEmail('');
      /*Petit temps d'attente 5s pour la redirection vers la page de connexion*/
      setTimeout(() => {
        props.history.push('/login');
      },5000)
    })
    .catch(error => {
      setError(error);
      setEmail('');
    })

  }

  const disabled = email === '';

  return (
    <div className="signUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftForget"></div>
            <div className="formBoxRight">
                <div className="formContent">

                    {success && <span
                        style = {{
                        border: "1px solid green",
                        background: "green",
                        color: "#fff"
                        }}>{success}</span>}

                    {error && <span>{error.message}</span>}

                    <h2>Forget Password ?</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="inputBox">
                          <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                          <label htmlFor="email">Email</label>
                      </div>
                      <button disabled={disabled}>Récupérer</button>
                    </form>
                    <div className="linkContainer">
                        <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
export default ForgetPassword;
