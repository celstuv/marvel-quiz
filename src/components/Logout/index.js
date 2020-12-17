import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase';

const Logout = () => {

  const firebase = useContext(FirebaseContext);

  const [checked, setChecked] = useState(false);
  /*console.log(checked);*/

  useEffect(() => {
    if (checked) {
      console.log("Déconnexion");
      firebase.signoutUser();
    }
  }, [checked], firebase);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  return (
    <div className="logoutContainer">
      <p>Switchez pour vous déconnecter : </p>
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
export default Logout;
