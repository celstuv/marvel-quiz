import React, {useRef, useEffect} from 'react';
//useRef et useEffect sont des hooks

const Landing = () => {

  const refWolverine = useRef(null);
  //console.log(refWolverine); pour voir si j'ai une classList

  //Ajout de function pour changer l'image
  //useEffect s'exécute 1 fois dans return au moment de l'affichage de la page
  useEffect(() => {
    //ajout de css pour obtenir l'image w-men.png
    refWolverine.current.classList.add("startingImg");
    //retirer limage au bout de 3s
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
    }, 3000);
  }, [])

  return (
    //au moment de l'affichage de la page , on a wolverine sans griffe
    <main ref={refWolverine} className="welcomePage">
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
      </div>
    </main>
  )
}
export default Landing;
