import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import Lottie from 'react-lottie';
import HistoryContainer from '../HistoryContainer/HistoryContainer';
import DirectionButton from '../DirectionButton/DirectionButton';
import BackToHome from '../BackToHome/BackToHome';
import {
  optionsSend,
  optionsWaiting,
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import {
  AllGameContainer,
  GameContainer,
  GameHeader,
  GuessCard,
  GameFooter,
  History,
  GuessCardHeader,
  GuessWhoItIs
} from './style';

class GameGuesserView extends Component {

  state = {
    guessInputField: "",
    thisGame: false,
    thisGamesGuesses: false,
    questionIsNotSent: true,
    waitingForAnswere: false,
    answere: null,
    answereRecieved: false,
    lastGuess: null,
  }

  _isMounted = true;

  componentDidMount() {
    if (this._isMounted) {
      this.getThisGame();
      this.checkIfAnswereRecieved();
      if (localStorage.getItem("waitingForAnswere")) {
        this.setState({waitingForAnswere: true, questionIsNotSent: false})
      }
      this.getAllGuesses();
      this.checkIfThereAreAnyGuesses();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    if (this.state.answereRecieved === true) {
      this.checkIfAnswereRecieved();
    }
  }

  checkIfThereAreAnyGuesses = () => {
      firebase.database().ref(`games/${this.props.gameID}/guesses`).on('value', (data) => {
      console.log(data.val());
      if (data.val() === null) {
        this.setState({waitingForAnswere: false, questionIsNotSent: true})
      }
    });
  }

  checkIfAnswereRecieved = () => {
    setTimeout(() => {
      if (this.state.answereRecieved === true) {
        this.setState({
          answere: null,
          answereRecieved: false,
          questionIsNotSent: true,
          waitingForAnswere: false,
          lastGuess: false,
          guessInputField: "",
        })
      }
    }, 2500)
  }

  getThisGame = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .on('value', (data) => {
        this.setState({thisGame: data.val()})
        console.log(data.val());
    });
  }

  sendGuess = (game) => {
    firebase.database().ref(`games/${this.props.gameID}/guesses`)
    .push({
      guess: this.state.guessInputField,
    })
    firebase.database().ref(`games/${this.props.gameID}/remainingGuesses`)
    .transaction((remainingGuesses) => {
      if (remainingGuesses) {
        remainingGuesses = remainingGuesses - 1;
      }
      return remainingGuesses;
    })
    this.setState({questionIsNotSent: false})
    setTimeout(() => {
      this.setState({waitingForAnswere: true});
      localStorage.setItem('waitingForAnswere', true);
    }, 1200);
  }

  getAllGuesses = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}/guesses`)
    .on('value', (data) => {
      if (data.val()) {
          this.setState({thisGamesGuesses: Object.entries(data.val())})
          this.setState({lastGuess: Object.entries(data.val()).slice(-1)[0][1].guess});
        let latestAnswere = Object.entries(data.val()).slice(-1)[0][1].answere;
        if (latestAnswere === undefined || latestAnswere === null) {this.setState({answere: null})}
        else if (latestAnswere === true) {
          this.setState({answere: true, answereRecieved: true});
          localStorage.setItem('waitingForAnswere', false);
        }
        else if (latestAnswere === false) {
          this.setState({answere: false, answereRecieved: true});
          localStorage.setItem('waitingForAnswere', false);
        }
      }
    });
  }

  handleChange = (e) => {
    if (this._isMounted) {
      this.setState({ [e.target.className] : e.target.value});
    }
  }

  render() {
    const params = {
      speed: 600,
    };

    const optionsAnswereRecieved = {
      loop: false,
      autoplay: true,
      animationData: this.state.answere === true ? require('./anims/yes.json') : require('./anims/no.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const {thisGame, thisGamesGuesses, questionIsNotSent, waitingForAnswere} = this.state;

    return(
      <AllGameContainer answere={this.state.answere}>
        <div className="bg">
          <Lottie
            style={{width: "100%", position: "absolute"}}
            options={optionsBackgroundAnimGrey}
            isStopped={false}
          />
          <Lottie
            style={{width: "100%", position: "absolute"}}
            options={optionsBackgroundAnimPink}
            isStopped={false}
          />
        </div>

        <Swiper {...params} initialSlide={1}>
          <History>
            <HistoryContainer guesses={thisGamesGuesses} />
            <p>Gissa -></p>
          </History>

          <GameContainer>
            <GameHeader>
              <div className="blurredImage" style={{backgroundImage: `url(${thisGame.secretPersonImage})`}}></div>
              <div className="headerText">
                <p className="guessNr">{thisGame.remainingGuesses && `${20-thisGame.remainingGuesses}/20`}</p>
                <p className="opponent">{thisGame ? `Spelar med ${thisGame.gameOwnerName}` : `Spelar med en sköning`}</p>
              </div>
            </GameHeader>

            <GuessCard answere={this.state.answere}>
              <GuessCardHeader>
                <div className="guessInfo">
                  <p>{`${20-thisGame.remainingGuesses}`}</p>
                  <div className="lastGuesser"></div>
                </div>
              </GuessCardHeader>
              {this.state.waitingForAnswere
                ? <div className="guessInputField">{this.state.lastGuess}</div>
                : <textarea
                  onChange={this.handleChange}
                  className="guessInputField"
                  value={this.state.guessInputField}
                  placeholder="Ställ din fråga här!"> </textarea>
                }
                <div className="sendGuessWrapper">
                  {this.state.answereRecieved ?
                    <div className="sendGuessButton">
                      <Lottie options={optionsAnswereRecieved}
                        height={50}
                        width={50}
                        isStopped={false}
                      />
                    </div>
                    : waitingForAnswere
                    ? <div className="sendGuessButton">
                      <Lottie options={optionsWaiting}
                        height={50}
                        width={50}
                        isStopped={questionIsNotSent}
                      />
                    </div>
                    : <div className="sendGuessButton" onClick={this.sendGuess}>
                      <Lottie options={optionsSend}
                        height={50}
                        width={50}
                        isStopped={questionIsNotSent}
                      />
                    </div>

                  }
                </div>
              </GuessCard>

              <GuessWhoItIs>Jag tror jag vet!</GuessWhoItIs>

              <GameFooter>
                <DirectionButton text="Historik" arrowLeft={true}/>
                <BackToHome />
              </GameFooter>

            </GameContainer>
          </Swiper>
        </AllGameContainer>
      )
    }
  }

  export default GameGuesserView;
