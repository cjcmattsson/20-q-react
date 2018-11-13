import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import Lottie from 'react-lottie';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import DirectionButton from '../DirectionButton/DirectionButton';
import BackToHome from '../BackToHome/BackToHome';
import HistoryContainer from '../HistoryContainer/HistoryContainer';
import {
  AllGameContainer,
  GameContainer,
  GameHeader,
  GameFooter,
  History,
  AnswereGuessContainer,
  GuessCardHeader,
  IncomingGuessCard,
  AnswereButton
 } from './style';

class GameOwnerView extends Component {

  state = {
    thisGame: false,
    thisGamesAnsweredGuesses: [],
    lastGuess: false,
    opponents: [],
  }

  _isMounted = true;

  componentDidMount() {
    if (this._isMounted) {
      this.getThisGame();
      this.getAllGuesses();
    }
  }

  getThisGame = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .on('value', (data) => {
      if (this._isMounted) {
        this.setState({thisGame: data.val()})
        console.log(data.val());
        let players = firebase.database().ref(`users`).orderByChild('uid').equalTo(`${data.val().gameGuesserId}`);
        if (players) {
          players.on('value', (snapshot) => {
            if (snapshot.val()) {
              this.setState({opponents: Object.values(snapshot.val())[0]})
              console.log(this.state.opponents);
            }
          })
        }
      }
    })
  }

  getAllGuesses = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}/guesses`)
    .on('value', (data) => {
      if (data.val()) {
        const answeredQuestionsList = [];
        if (this._isMounted) {
        Object.entries(data.val()).map(guess => {
          if (guess[1].answere != null) {
            answeredQuestionsList.push(guess);
          }
          return answeredQuestionsList;
        })
      }
        console.log(answeredQuestionsList);
        if (this._isMounted) {
          this.setState({thisGamesAnsweredGuesses: answeredQuestionsList})
          this.setState({lastGuess: Object.entries(data.val()).slice(-1)[0][1].answere ? false : Object.entries(data.val()).slice(-1)[0]})
        }
      }
    });
  }

  answereQuestion = (thisGuess, answere) => {
    firebase.database().ref(`games/${this.props.gameID}/guesses/${thisGuess}`)
    .update({
      answere: answere,
    })
    firebase.database().ref(`games/${this.props.gameID}/remainingGuesses`)
    .transaction((remainingGuesses) => {
      if (remainingGuesses) {
        remainingGuesses = remainingGuesses - 1;
      }
      return remainingGuesses;
    })
    if (this._isMounted) {
      this.setState({lastGuess: false})
    }
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  constructor(props) {
      super(props)
      this.swiper = null
    }

    goNext = () => {
      if (this.swiper) this.swiper.slideNext();
    }

    goPrev = () => {
      if (this.swiper) this.swiper.slidePrev();
    }

  render() {
    const {lastGuess, thisGame, thisGamesAnsweredGuesses, opponents} = this.state;
    const params = {
      speed: 600,
    };
    return(
      <AllGameContainer>

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

        <Swiper
          {...params}
          initialSlide={1}
          ref={node => {if(node) this.swiper = node.swiper}}>
          <History>
            <HistoryContainer guesses={thisGamesAnsweredGuesses} />
            {/*{thisGamesAnsweredGuesses && thisGamesAnsweredGuesses.slice(0).reverse().map((game, key) => {
              return <div key={key}>
                <p>{game[1].guess}</p>
                <button onClick={() => this.answereQuestion(game[0], true)}>Yes</button>
                <button onClick={() => this.answereQuestion(game[0], false)}>No</button>
              </div>
            })}*/}
            <div className="historyFooter">
              <DirectionButton text="Tillbaka" arrowRight={true} swipe={this.goNext}/>
            </div>
          </History>

          <GameContainer>
            <GameHeader>
              <div className="blurredImage" style={{backgroundImage: `url(${thisGame.secretPersonImage})`}}></div>
              <div className="headerText">
                <p className="guessNr">{thisGame.remainingGuesses && `${20-thisGame.remainingGuesses}/20`}</p>
                <p className="secretPerson">{thisGame && thisGame.secretPerson}</p>
              </div>
            </GameHeader>

            <AnswereGuessContainer>
              <AnswereButton yes style={{opacity: lastGuess ? 1 : 0.3}}>
                <img
                  onClick={() => this.answereQuestion(lastGuess[0], true)}
                  src={require('./icons/yes.svg')}
                  alt=""/>
              </AnswereButton>
              <IncomingGuessCard>
                <GuessCardHeader>
                  <div className="guessInfo">
                    <p>{`${20-thisGame.remainingGuesses}`}</p>
                    <div className="lastGuesser" style={{backgroundImage: opponents && `url(${opponents.photo})`}}></div>
                  </div>
                </GuessCardHeader>
                {lastGuess ?
                  <div>
                    <div className="questionText">{lastGuess[1].guess && lastGuess[1].guess}</div>
                  </div>
                  : <div>
                    <div className="questionTextWaiting">Väntar på nästa fråga</div>
                  </div>
                }
              </IncomingGuessCard>

              <AnswereButton style={{opacity: lastGuess ? 1 : 0.3}}>
                <img
                  onClick={() => this.answereQuestion(lastGuess[0], false)}
                  src={require('./icons/no.svg')}
                  alt=""/>
              </AnswereButton>
            </AnswereGuessContainer>

            <GameFooter>
              <DirectionButton text="Historik" arrowLeft={true} swipe={this.goPrev}/>
              <BackToHome />
            </GameFooter>

          </GameContainer>

        </Swiper>
    </AllGameContainer>
    )
  }
}

export default GameOwnerView;
