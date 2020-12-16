import React, { useRef, useEffect, useState, Fragment } from 'react';
//useRef et useEffect useState, Fragment sont des hooks
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

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


  //Afficher les griffes qd on survol les boutons inscriptions et connexions
  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
    //refWolverine.current.classList.remove("rightImg");
  }

  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
    //refWolverine.current.classList.remove("leftImg");
  }

  // Autre methodes pour Effacer les griffes si on est sur l'un a=ou l'autre des boutons
  const clearImg = () => {
    if(refWolverine.current.classList.contains("leftImg")) {
      refWolverine.current.classList.remove("leftImg")
    } else if (refWolverine.current.classList.contains("rightImg"))
    refWolverine.current.classList.remove("rightImg");
  }


  //condition de fonction si Btn est true alors affiche les boutons
  const displayBtn = btn && (
    //Fragment = div sans les caractéristiques de la div
    //Link permet faire des liens. <link></Link> = <a href></a>
    <Fragment>
      <div className="leftBox">
        <Link onMouseOver={setLeftImg} onMouseOut={clearImg} className="btn-welcome" to ="/signup">Inscription</Link>
      </div>
      <div className="rightBox">
        <Link onMouseOver={setRightImg} onMouseOut={clearImg} className="btn-welcome" to ="/login">Connexion</Link>
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
