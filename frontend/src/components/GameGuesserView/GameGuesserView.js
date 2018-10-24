import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';

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
        console.log(Object.entries(data.val()));
        if (this._isMounted) {
          this.setState({thisGamesGuesses: Object.entries(data.val())})
        }
      }
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.className] : e.target.value,});
  }

  render() {
    const {thisGame, thisGamesGuesses} = this.state;
    return(
      <div className="gameGuesserView">
        <h1>{thisGame && `Now guess who ${thisGame.gameOwnerName} is thinking of!`}</h1>
        <h2>Remaining guesses: {thisGame && `${thisGame.remainingGuesses}`}</h2>

      <Swiper>
        <div>
          <div style={{width: "200px", height: "200px", border: "1px solid black", margin: "0 auto"}}>
            <textarea onChange={this.handleChange} className="guessInputField" value={this.state.guessInputField}> </textarea>
            <button onClick={this.sendGuess} className="sendGuess">-></button>
          </div>
        </div>
        <div>
          <h2>History</h2>
          {thisGamesGuesses && thisGamesGuesses.map((guess, key) => {
            return <p style={{color: guess[1].answere ? "green" : "red"}} key={key}>{guess[1].guess}</p>
          })}
        </div>
      </Swiper>
      <Link to="/">Go to start</Link>
      </div>
    )
  }
}

export default GameGuesserView;
