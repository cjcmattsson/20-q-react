import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import { Link } from '@reach/router';
import {
  AllGameContainer,
  GameContainer,
  GameHeader,
  GameFooter,
  History,
  AnswereGuessContainer,
  IncomingGuessCard,
  AnswereButton
 } from './style';

class GameOwnerView extends Component {

  state = {
    thisGame: false,
    thisGamesAnsweredGuesses: [],
    lastGuess: false,
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
      <AllGameContainer>
        <Swiper initialSlide={1}>
          <History>
            {thisGamesAnsweredGuesses && thisGamesAnsweredGuesses.slice(0).reverse().map((game, key) => {
              return <div key={key}>
                <p>{game[1].guess}</p>
                <button onClick={() => this.answereQuestion(game[0], true)}>Yes</button>
                <button onClick={() => this.answereQuestion(game[0], false)}>No</button>
              </div>
            })}
          </History>

          <GameContainer>
            <GameHeader>
              <div className="blurredImage"></div>
              <div className="headerText">
                <p>{thisGame.remainingGuesses && `${20-thisGame.remainingGuesses}/20`}</p>
                <p>{thisGame && thisGame.secretPerson}</p>
              </div>
            </GameHeader>

            <AnswereGuessContainer>
              <AnswereButton yes></AnswereButton>
              <IncomingGuessCard>
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
              </IncomingGuessCard>

              <AnswereButton></AnswereButton>
            </AnswereGuessContainer>

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

export default GameOwnerView;
