import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class Quiz extends Component {

   render() {
     const {pseudo} = this.props.userData;

     return (
       <div>
         <h2>Bonjour : {pseudo}, et bienvenue sur notre Quiz !</h2>
         <Levels />
         <ProgressBar />
         <h3>Notre Question Quiz</h3>
         <p className="answerOptions">Question 1</p>
         <p className="answerOptions">Question 2</p>
         <p className="answerOptions">Question 3</p>
         <p className="answerOptions">Question 4</p>
         <button className="btnSubmit" type="button">Suivant</button>
       </div>
     )
   }
}

export default Quiz;
