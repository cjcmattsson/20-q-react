import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';
import HistoryContainer from '../HistoryContainer/HistoryContainer';
import './GameGuesserView.css';

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
      <div className="gameGuesserView">
        <Swiper {...params} initialSlide={0}>
          <div style={{height: "90vh", overflowY: "scroll"}}>
            <h2>History</h2>
            <HistoryContainer guesses={thisGamesGuesses} />
          </div>
          <div>
            <h1>{thisGame ? `Now guess who ${thisGame.gameOwnerName} is thinking of!` : `Now guess who the player is thinking of!`}</h1>
            <h2>Remaining guesses: {thisGame ? `${thisGame.remainingGuesses}` : `wait for it...`}</h2>
            <div style={{width: "200px", height: "200px", border: "1px solid black", margin: "0 auto"}}>
              <textarea onChange={this.handleChange} className="guessInputField" value={this.state.guessInputField}> </textarea>
              <button onClick={this.sendGuess} className="sendGuess">-></button>
            </div>
          </div>
        </Swiper>
        <Link to="/">Go to start</Link>
      </div>
    )
  }
}

export default GameGuesserView;
