import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';
import Lottie from 'react-lottie';
import HistoryContainer from '../HistoryContainer/HistoryContainer';
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
    this.getThisGame();
    this.getAllGuesses();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getThisGame = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .on('value', (data) => {
      if (this._isMounted) {
        this.setState({thisGame: data.val()})
        console.log(data.val());
      }
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
    setTimeout(() => {this.setState({waitingForAnswere: true})}, 1200);
  }

  getAllGuesses = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}/guesses`)
    .on('value', (data) => {
      if (data.val()) {
        if (this._isMounted) {
          this.setState({thisGamesGuesses: Object.entries(data.val())})
          this.setState({lastGuess: Object.entries(data.val()).slice(-1)[0][1].guess})
        }
        let latestAnswere = Object.entries(data.val()).slice(-1)[0][1].answere;
        if (latestAnswere == undefined) {this.setState({answere: null})}
        else if (latestAnswere == true) {this.setState({answere: true, answereRecieved: true})}
        else if (latestAnswere == false) {this.setState({answere: false, answereRecieved: true})}
      }
    });
  }

  handleChange = (e) => {
    if (this._isMounted) {
      this.setState({ [e.target.className] : e.target.value,});
    }
  }

  render() {
    const params = {
      speed: 600,
      parallax: true,
      parallaxEl: {
        el: '.parallax-bg',
        value: '-23%'
      }
    };

        const options = {
          loop: false,
          autoplay: false,
          animationData: require('./send.json'),
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };
        const optionsWaiting = {
          loop: true,
          autoplay: false,
          animationData: require('./blobload.json'),
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };
        const optionsBackgroundAnim = {
          loop: true,
          autoplay: true,
          animationData: require('./backgroundpink.json'),
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };
        const optionsAnswereRecieved = {
          loop: false,
          autoplay: true,
          animationData: this.state.answere == true ? require('./yes.json') : require('./no.json'),
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };

    const {thisGame, thisGamesGuesses, questionIsNotSent, waitingForAnswere} = this.state;

    return(
      <AllGameContainer answere={this.state.answere}>
        <div className="bg">
          <Lottie
            style={{width: "100%", position: "absolute", fill: "green"}}
            options={optionsBackgroundAnim}
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
              <div className="blurredImage" onClick={() => {this.setState({answere: true})}}></div>
              <div className="headerText" onClick={() => {this.setState({answere: false})}}>
                <p>{thisGame.remainingGuesses && `${20-thisGame.remainingGuesses}/20`}</p>
                <p>{thisGame ? `Spelar med ${thisGame.gameOwnerName}` : `Spelar med en sköning`}</p>
              </div>
            </GameHeader>

            <GuessCard>
              <GuessCardHeader>
                <div className="guessInfo">
                  <p>{`${20-thisGame.remainingGuesses}`}</p>
                  <div className="lastGuesser"></div>
                </div>
              </GuessCardHeader>
              {questionIsNotSent
                ? <textarea
                onChange={this.handleChange}
                className="guessInputField"
                value={this.state.guessInputField}
                placeholder="Ställ din fråga här!"> </textarea>
              : <div className="guessInputField">{this.state.lastGuess}</div>}
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
                <Lottie options={options}
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
              <p>Historik</p>
              <Link to="/">Hem</Link>
            </GameFooter>

          </GameContainer>
        </Swiper>
      </AllGameContainer>
    )
  }
}

export default GameGuesserView;
