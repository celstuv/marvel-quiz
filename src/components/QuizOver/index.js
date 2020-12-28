import React, {Fragment, useEffect, useState} from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../Loader';
import Modal from '../Modal';

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

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const showModal = id => {
    /*Recherche d'informations relatives à la question posée dnas le quiz */
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);
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
          <div className="modalHeader">
            <h2>titre</h2>
          </div>
          <div className="modalBody">
            <h3>Titre2</h3>
          </div>
          <div className="modalFooter">
            <button className="modalBtn">Fermer</button>
          </div>
        </Modal>
      </Fragment>
  )
})


export default React.memo(QuizOver);
