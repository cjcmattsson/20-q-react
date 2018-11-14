import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import {
  GameCardLinkContainer,
  GamePicBlurred,
  GameInfo,
} from './style.js';

class GameCardFinished extends Component {

  state = {
    result: null,
    image: null,
    name: null,
  }

  componentDidMount() {
    this.checkResult();
  }

  _isMounted = true;

  checkResult = () => {
    firebase.database().ref(`games/${this.props.gameID}`).on('value', (data) => {
      let game = data.val();
      if (game.gameOwnerId !== this.props.user.uid && game.theGuessersGuess === true) {
        this.setState({result: true, image: this.props.ownerImage, name: this.props.owner})
      } else if (game.gameOwnerId !== this.props.user.uid && game.theGuessersGuess === false) {
        this.setState({result: false, image: this.props.ownerImage, name: this.props.owner})
      } else if (game.gameOwnerId === this.props.user.uid && game.theGuessersGuess === false) {
        this.setState({result: true, image: this.props.guesserImage, name: this.props.guesser})
      } else if (game.gameOwnerId === this.props.user.uid && game.theGuessersGuess === true) {
        this.setState({result: false, image: this.props.guesserImage, name: this.props.guesser})
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {

    return (
      <GameCardLinkContainer>
        <GamePicBlurred style={{backgroundImage: `url(${this.props.image})`}}></GamePicBlurred>
        <GameInfo>
          <div className="textAndButtons">
            <h3>{`Du ${this.state.result ? "vann" : "förlorade"}!`}</h3>
            <div className="opponent">
              <div className="imageHere" style={{backgroundImage: this.state.image ? `url(${this.state.image})` : `url("./bjornborgpixel.jpg")`}}> </div>
              <p>{this.state.name}</p>
            </div>
          </div>
        </GameInfo>
      </GameCardLinkContainer>
    )
  }
}

export default GameCardFinished;
