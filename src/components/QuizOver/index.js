import React, {Fragment, useEffect, useState} from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';

const QuizOver = React.forwardRef((props, ref) => {
  /*console.log(props);
  console.log(ref);*/
  const { levelNames,
          score,
          maxQuestions,
          quizLevel,
          percent,
          loadLevelQuestions
        } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  /*console.log(API_PUBLIC_KEY);*/
  const hash = 'f7f2e6fd5c00a5f08992fdff3eed798e'

  const[asked, setAsked] = useState([]);
  /*console.log(asked);*/
  const[openModal, setOpenModal] = useState(false);
  const[characterInformations, setCharacterInformations] = useState([]);
  const[loading, setLoading] = useState(true);


  useEffect(() => {
    setAsked(ref.current)
    /*Rafraichissement des donnés touts les 15 jours*/
    if (localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
  }, [ref])

  const checkDataAge = date => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now());
    }
  }

  const showModal = id => {
    /*Recherche d'informations relatives à la question posée dnas le quiz */
    setOpenModal(true);
    if (localStorage.getItem(id)) {
      setCharacterInformations( JSON.parse(localStorage.getItem(id)) );
      setLoading(false);
    } else {
        axios
          .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
          .then(response => {
            /*console.log(response);*/
            setCharacterInformations(response.data);
            setLoading(false);

            localStorage.setItem(id, JSON.stringify(response.data));
            if (!localStorage.getItem('marvelStorageDate') ) {
              localStorage.setItem('marvelStorageDate', Date.now());
            }

          })
          .catch ( error => console.log(error) )
    }
  }

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  }

  const capitelizeFirstletter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel)
    }, 3000);
  }

  const decision = score >= averageGrade ? (
    <Fragment>
      <div className="stepsBtnContainer">
      {
        quizLevel < levelNames.length ?
        (
          <Fragment>
            <p className="successMsg">Bravo, passez au niveau suivant!</p>
            <button
              type="button"
              className="btnResult success"
              onClick={() => loadLevelQuestions(quizLevel)}>
              Niveau Suivant
            </button>
          </Fragment>
        )
        :
        (
          /*Le quiz est terminé, on retourne sur l'accueil*/
          <Fragment>
              <p className="successMsg"><GiTrophyCup size='50px'/> Bravo, vous êtes un expert !</p>
              <button
                type="button"
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}>
                Accueil
              </button>
          </Fragment>
        )
      }
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite : {percent}%</div>
        <div className="progressPercent">Note : {score} / {maxQuestions}</div>
      </div>
    </Fragment>
   )
   :
   (
   <Fragment>
     <div className="stepsBtnContainer">
        <p className="failureMsg">Vous avez échoué !</p>
     </div>
     <div className="percentage">
        <div className="progressPercent">Réussite: {percent}%</div>
        <div className="progressPercent">Note: {score}/{maxQuestions}</div>
     </div>
   </Fragment>
  );

  const questionAnswer = score >= averageGrade ? (
   asked.map(question => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                type="button"
                className="btnInfo"
                onClick={ () => showModal(question.heroId) }>Informations</button>
            </td>
          </tr>
        )
      })
    ) :
    (
      <tr>
        <td colSpan='3'>
          <Loader
            loadingMsg={'Pas de réponses !'}
            styling={{ textAlign: 'center', color: 'red' }}/>
        </td>
      </tr>
    )

const resultInModal = !loading ?
(
  <Fragment>
    <div className="modalHeader">
      <h2>{ characterInformations.data.results[0].name }</h2>
    </div>
    <div className="modalBody">
      <div className="comicImage">
        <img
          src={characterInformations.data.results[0].thumbnail.path+'.'+characterInformations.data.results[0].thumbnail.extension}
          alt={characterInformations.data.results[0].name}
        />
        <p>{characterInformations.attributionText}</p>
      </div>
      <div className="comicDetails">
        <h3>Description</h3>
        {
          characterInformations.data.results[0].description ? <p>{ characterInformations.data.results[0].description }</p>
        : <p>Description indisponible ....</p>

        }
        <h3>Plus d'informations</h3>
        {
          characterInformations.data.results[0].urls &&
          characterInformations.data.results[0].urls.map( (url, index) => {
            return <a
                    key={index}
                    href={url.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {capitelizeFirstletter(url.type)}
                    </a>
          })
        }
      </div>
    </div>
    <div className="modalFooter">
      <button className="modalBtn" onClick={ hideModal }>Fermer</button>
    </div>
  </Fragment>
)
:
(
  <Fragment>
    <div className="modalHeader">
      <h2>Réponse de Marvel ...</h2>
    </div>
    <div className="modalBody">
      <Loader />
    </div>
  </Fragment>
)


  return (
    <Fragment>

        {decision}

      <hr/>
        <p> Les réponses aux questions posées : </p>
        <div className="answerContainer">
          <table className="answers">
            <thead>
              <tr>
                <th>Questions</th>
                <th>Réponses</th>
                <th>Informations</th>
              </tr>
            </thead>
            <tbody>
              {questionAnswer}
            </tbody>
          </table>
        </div>
        <Modal showModal={ openModal } hideModal={ hideModal }>

          { resultInModal }

        </Modal>
      </Fragment>
  )
})


export default React.memo(QuizOver);
