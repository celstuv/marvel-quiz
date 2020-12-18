import React, { Fragment } from 'react';

/*Importation des props de quiz*/
const ProgressBar = ({idQuestion, maxQuestions}) => {
  /*console.log(idQuestion, maxQuestions);*/
  const qetWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  }

  const actualQuestion = idQuestion + 1;
  const progressPercent = qetWidth(maxQuestions, actualQuestion);
  console.log(progressPercent);

  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">{`Question : ${idQuestion + 1}/${maxQuestions}`}</div>
        <div className="progressPercent">{`Progression : ${progressPercent}%`}</div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style = {{ width: `${progressPercent}%` }}></div>
      </div>
    </Fragment>
  )
}
//On optimise les performances de notre fonction
export default React.memo(ProgressBar);
