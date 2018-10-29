import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';
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
  }

  getAllGuesses = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}/guesses`)
    .on('value', (data) => {
      if (data.val()) {
        if (this._isMounted) {
          this.setState({thisGamesGuesses: Object.entries(data.val())})
        }
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
    const {thisGame, thisGamesGuesses} = this.state;

    return(
      <AllGameContainer>
        <Swiper {...params} initialSlide={1}>

          <History>
            <HistoryContainer guesses={thisGamesGuesses} />
            <p>Gissa -></p>
          </History>

          <GameContainer>
            <GameHeader>
              <div className="blurredImage"></div>
              <div className="headerText">
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
                <p className="getRandomQuestion">X</p>
              </GuessCardHeader>
              <textarea onChange={this.handleChange} className="guessInputField" value={this.state.guessInputField} placeholder="Ställ din fråga här!"> </textarea>
            <div className="sendGuess">
              <button onClick={this.sendGuess}>-></button>
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
