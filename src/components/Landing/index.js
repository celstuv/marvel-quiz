import React, { useRef, useEffect, useState, Fragment } from 'react';
//useRef et useEffect useState, Fragment sont des hooks

const Landing = () => {

  //Création d'une variable d'état à false
  const [btn, setBtn] = useState(false);

  const refWolverine = useRef(null);
  //console.log(refWolverine); pour voir si j'ai une classList

  //Ajout de function useEffect pour changer l'image au chargement de la page
  //useEffect s'exécute 1 fois dans return au moment de l'affichage de la page
  useEffect(() => {
    //ajout de css pour obtenir l'image w-men.png
    refWolverine.current.classList.add("startingImg");
    //retirer l'image au bout de 1s ainsi que les boutons inscriptions et connexions
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, [])


  //condition de fonction si Btn est true alors affiche les boutons
  const displayBtn = btn && (
    //Fragment = div sans les caractéristiques de la div
    <Fragment>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
      </div>
    </Fragment>
  )

  return (
    //au moment de l'affichage de la page , on a wolverine sans griffe
    <main ref={refWolverine} className="welcomePage">
      { displayBtn }
    </main>
  )
}
export default Landing;
