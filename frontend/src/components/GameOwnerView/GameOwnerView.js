import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';
import'./GameOwnerView.css';

class GameOwnerView extends Component {

  state = {
    thisGame: false,
    thisGamesAnsweredGuesses: [],
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
    if (this._isMounted) {
      this.setState({lastGuess: false})
    }
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {
    const {lastGuess, thisGame, thisGamesAnsweredGuesses} = this.state;
    return(
      <div className="gameOwnerView">
        <h2>{thisGame.gameGuesserId ? `Answere ${thisGame.gameGuesserName}'s questions` : "Answere the player's questions"}</h2>
        <h3>{thisGame.secretPerson ? `Correct answere: ${thisGame.secretPerson}` : `Correct answere: wait for it...`}</h3>
        <Swiper>
          <div>
            {lastGuess ?
                <div>
                  <h2 className="testThisShit">{lastGuess[1].guess && lastGuess[1].guess}</h2>
                  <button onClick={() => this.answereQuestion(lastGuess[0], true)}>Yes</button>
                  <button onClick={() => this.answereQuestion(lastGuess[0], false)}>No</button>
                </div>
                : <div>
                  <h2 className="testThisShit">Väntar på nästa fråga</h2>
                </div>
              }
          </div>
          <div>
            {thisGamesAnsweredGuesses && thisGamesAnsweredGuesses.slice(0).reverse().map((game, key) => {
              return <div key={key}>
                <p>{game[1].guess}</p>
                <button onClick={() => this.answereQuestion(game[0], true)}>Yes</button>
                <button onClick={() => this.answereQuestion(game[0], false)}>No</button>
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
