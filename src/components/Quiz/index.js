import React, { Component } from 'react';
import { QuizMarvel } from '../quizMarvel/';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class Quiz extends Component {

  state = {
    levelNames: ["debutant","confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0
  }

  loadQuestions = quizz => {
    /*console.log(quizz);*/
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    /*console.log(fetchedArrayQuiz);*/
    if(fetchedArrayQuiz.length >= this.state.maxQuestions) {
        const newArray = fetchedArrayQuiz.map( ({answer,... keepRest}) => keepRest);
        this.setState({storedQuestions: newArray})
    } else {
        alert("Pas assez de questions");
    }
  }

  /*Méthode de cycle de vie
  il s'exécute puis lance loadQuestions*/
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.storedQuestions !== prevState.storedQuestions){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    }
  }



  /*qd le render s'éxécute, componentDidMount s'exécute */
   render() {
     const {pseudo} = this.props.userData;
     const displayOptions = this.state.options.map((option, index) => {
       return(
         <p key={index} className="answerOptions">{option}</p>
       )
     })

     return (
       <div>
         <h2>Bonjour : {pseudo}, et bienvenue sur notre Quiz !</h2>
         <Levels />
         <ProgressBar />
         <h3>{this.state.question}</h3>

         {displayOptions}
         
         <button className="btnSubmit" type="button">Suivant</button>
       </div>
     )
   }
}

export default Quiz;
