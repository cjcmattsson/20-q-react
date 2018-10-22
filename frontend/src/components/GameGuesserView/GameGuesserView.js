import React, { Component } from 'react';
import firebase from '../../utils/firebase';

class GameGuesserView extends Component {

  state = {
    guess: false,
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
      guess: this.state.guess,
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
    this.setState({ [e.target.name] : e.target.value,});
  }

  render() {
    const {thisGame, thisGamesGuesses} = this.state;
    return(
      <div className="gameGuesserView">
        <h1>{thisGame && `Now guess who ${thisGame.gameOwnerName} is thinking of!`}</h1>
        <input onChange={this.handleChange} type="text" name="guess" className="guessInputField"/>
        <button onClick={this.sendGuess} className="sendGuess">-></button>
        <br/>
        <h2>Remaining guesses: {thisGame && `${thisGame.remainingGuesses}`}</h2>
        <h2>History</h2>
        {thisGamesGuesses && thisGamesGuesses.map((guess, key) => {
          return <p style={{color: guess[1].answere ? "green" : "red"}} key={key}>{guess[1].guess}</p>
        })}
      </div>
    )
  }
}

export default GameGuesserView;
