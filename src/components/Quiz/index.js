import React, { Component, Fragment } from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QuizMarvel} from '../quizMarvel/';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa';

toast.configure();

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null
}

const levelNames = ['debutant', 'confirmé', 'expert'];

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    /* console.log(fetchedArrayQuiz); */
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      /*Ne pas faire afficher la réponse (dans le cas de user
      dév ayantl'extension react chrome, mozilla, etc)*/
      const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
      this.setState({ storedQuestions: newArray })
    }
  }

  //Configurer pop-up pour accueillir le joueur
  showToastMsg = pseudo => {
    if (!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true })

      toast.warn(`🦄 Bonjour ${pseudo}, et bienvenue sur notre Quiz ! Et bonne Chance !`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        bodyClassName: "toastify-color-welcome"
      });
    }

  };

  /*Méthode de cycle de vie
  il s'exécute puis lance loadQuestions*/
  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel])
  }

  nextQuestion = () => {
    /*Verifier si l'on se trouve dans la dernière question du niveau*/
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      /*Si c'est le cas, on bascule sur composant gameOver*/
      /*this.gameOver();*/
      this.setState({ quizEnd: true })
      /*sinon on basculte sur la question suivante*/
    } else {
      this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
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
        draggable: false,
        bodyClassName: "toastify-color"
        });
    } else {
      toast.error('🦄 Raté 0 !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        bodyClassName: "toastify-color"
        });
            }
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd
    } = this.state;

      if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
        this.setState({
          question: storedQuestions[idQuestion].question,
          options: storedQuestions[idQuestion].options
            })
      }
      if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
        this.setState({
          question: storedQuestions[idQuestion].question,
          options: storedQuestions[idQuestion].options,
          userAnswer: null,
          btnDisabled: true
            })
      }
      if (quizEnd !== prevState.quizEnd) {
        const gradePercent = this.getPercentage(maxQuestions, score);
        this.gameOver(gradePercent);
      }

      if (this.props.userData.pseudo != prevProps.userData.pseudo) {
        this.showToastMsg(this.props.userData.pseudo)
      }

  }

  submitAnswer = selectedAnswer => {
      this.setState({
          userAnswer: selectedAnswer,
          btnDisabled: false
        })
  }

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = percent => {

    if(percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent
      })
    } else {
      this.setState({ percent })
    }
  }

loadLevelQuestions = (param) => {
  this.setState({...initialState, quizLevel: param})
  this.loadQuestions(levelNames[param]);
}


  /* qd le render s'éxécute, componentDidMount s'exécute */
  render() {
    const {pseudo} = this.props.userData;

    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent
    } = this.state;


    const displayOptions = options.map((option, index) => {
      return (
        <p key={index}
          className={`answerOptions ${userAnswer === option ? 'selected' : null}`}
          onClick={() => this.submitAnswer(option)}>
          <FaChevronRight /> {option}
      </p>
      )
    })

    /*Si le QuizEnd (niveau) est terminé, j'affiche le message se trouvant dans le component QuizOver*/
    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
        />
      )
      :
      (
      <Fragment>
        <h2>Bonjour : {pseudo}, et bienvenue sur notre Quiz !</h2>
        <Levels
          levelNames={levelNames}
          quizLevel={quizLevel}
          />
        <ProgressBar
          idQuestion={idQuestion}
          maxQuestions={maxQuestions} />
        <h3>{question}</h3>

        {displayOptions}

        <button
          disabled={btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
          type="button">

          {idQuestion < maxQuestions - 1 ? 'Suivant' : 'Terminer'}

        </button>
      </Fragment>
    )
  }
}

export default Quiz;
