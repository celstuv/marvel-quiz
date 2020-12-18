import React, {Component} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QuizMarvel} from '../quizMarvel/';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

toast.configure();

class Quiz extends Component {

  state = {
    levelNames: [
      'debutant', 'confirme', 'expert'
    ],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false
  };

  storedDataRef = React.createRef();

  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    /* console.log(fetchedArrayQuiz); */
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      /*Ne pas faire afficher la réponse (dans le cas de user
      dév ayantl'extension react chrome, mozilla, etc)*/
      const newArray = fetchedArrayQuiz.map(({
        answer,
        ...keepRest
      }) => keepRest);
      this.setState({ storedQuestions: newArray })
    } else {
      alert('Pas assez de questions');
    }
  };

  //Configurer pop-up pour accueillir le joueur
  showWelcomeMsg = pseudo => {

    if (!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true })

      toast.warn(`🦄 Bonjour ${pseudo}, et bienvenue sur notre Quiz ! Et bonne Chance !`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        /* progress: undefined */
      });
    }

  };

  /*Méthode de cycle de vie
  il s'exécute puis lance loadQuestions*/
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      /* End */
    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }

    //Vérifer la réponse et incrémenter le score
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({ score: prevState.score + 1 }))
      toast.success('🦄 Bravo + 1!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        bodyClassName: "toastify-color"
        });
    } else {
      toast.error('🦄 Raté 0 !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        bodyClassName: "toastify-color"
        });
            }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
          })
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true
          })
      if (this.props.userData.pseudo) {
        this.showWelcomeMsg(this.props.userData.pseudo)
      }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
          })
    }
  }

  /* qd le render s'éxécute, componentDidMount s'exécute */
  render() {
    const {pseudo} = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p key={index}
          className={`answerOptions ${this.state.userAnswer === option ? "selected": null}`}
          onClick={() => this.submitAnswer(option)}>
        {option}
      </p>)
    })

    return (<div>
      <h2>Bonjour : {pseudo}, et bienvenue sur notre Quiz !</h2>
      <Levels/>
      <ProgressBar/>
      <h3>{this.state.question}</h3>

      {displayOptions}

      <button className="btnSubmit" onClick={this.nextQuestion} type="button" disabled={this.state.btnDisabled}>
        Suivant
      </button>
    </div>)
  }
}

export default Quiz;
