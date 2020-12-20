import React, {Fragment, useEffect, useState} from 'react';

const QuizOver = React.forwardRef((props, ref) => {
  /*console.log(props);
  console.log(ref);*/
  const { levelNames,
          score ,
          maxQuestions,
          quizLevel,
          percent,
          loadLevelQuestions
        } = props;

  const[asked, setAsked] = useState([]);
  console.log(asked);

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

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
              <p className="successMsg">Bravo, vous êtes un expert !</p>
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
              <button type="button" className="btnInfo">Informations</button>
            </td>
          </tr>
        )
      })
    ) :
    (
      <tr>
        <td colspan='3'>
          <div className="loader"></div>
          <p style={{ textAlign:'center', color:'red'}}>Pas de réponses !</p>
        </td>
      </tr>
    )



  return (
    <Fragment>

        {decision}

      <hr/>
        <p> Les réponses aux questions posées : </p>
        <div className="answerContainer"></div>
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
      </Fragment>
  )
})


export default React.memo(QuizOver);
