import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';
import'./GameOwnerView.css';

class GameOwnerView extends Component {

  state = {
    thisGame: false,
    thisGamesGuesses: [],
    lastGuess: false,
  }

  _isMounted = true;

  componentDidMount() {
    this.getThisGame();
    this.getAllGuesses();
  }

  getThisGame = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .on('value', (data) => {
      console.log(data.val());
      if (this._isMounted) {
        this.setState({thisGame: data.val()})
      }
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
          this.setState({lastGuess: this.state.thisGamesGuesses.slice(-1)[0]})
        }
      }
    });
  }

  answereYes = (thisGuess, answere) => {
    firebase.database().ref(`games/${this.props.gameID}/guesses/${thisGuess}`)
    .update({
      answere: answere,
    })
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {
    const {lastGuess, thisGame, thisGamesGuesses} = this.state;
    return(
      <div className="gameOwnerView">
        <h2>{thisGame.gameGuesserId ? `Answere ${thisGame.gameGuesserName}'s questions` : "Wait for someone to start guessing!"}</h2>
        <h3>Correct answere: {thisGame.secretPerson}</h3>
        <Swiper>
          <div>
            {lastGuess &&
                <div>
                  <h2 className="testThisShit">{lastGuess[1].guess}</h2>
                  <button onClick={() => this.answereYes(lastGuess[0], true)}>Yes</button>
                  <button onClick={() => this.answereYes(lastGuess[0], false)}>No</button>
                </div>
              }
          </div>
          <div>
            {thisGamesGuesses && thisGamesGuesses.slice(0).reverse().map((game, key) => {
              return <div key={key}>
                <p>{game[1].guess}</p>
                <button onClick={() => this.answereYes(game[0], true)}>Yes</button>
                <button onClick={() => this.answereYes(game[0], false)}>No</button>
              </div>
            })}
          </div>
        </Swiper>
        <Link to="/">Go to start</Link>

      </div>
    )
  }
}

export default GameOwnerView;
