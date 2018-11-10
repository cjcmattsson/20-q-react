import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import {
  GameCardLinkContainer,
  GamePicBlurred,
  GameInfo
 } from './style.js';
import { Link } from "@reach/router";

class GameCardOwner extends Component {

  state = {
    newQuestionRecieved: false,
  }

  _isMounted = true;

  componentDidMount() {
    this.updateCanvas();
    this.checkForUnansweredGuess();
  }

  checkForUnansweredGuess = () => {
      firebase.database()
      .ref(`games/${this.props.gameID}/guesses`)
      .on('value', (data) => {
        if (data.val()) {
          let guess = Object.entries(data.val()).slice(-1)[0][1];
          if ("answere" in guess !== true) {
            if (this._isMounted) {
              this.setState({newQuestionRecieved: true})
            }
          }
        }
      });
  }

  updateCanvas = () => {
    const ctx = this.refs.canvas.getContext('2d'),
        img = new Image();
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    img.onload = () => {
      var size = 15 * 0.01,
          w = this.refs.canvas.width * size,
          h = this.refs.canvas.height * size;
      ctx.drawImage(img, 0, 0, w, h);
      ctx.drawImage(this.refs.canvas, 0, 0, w, h, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
    };
    img.src = this.props.image;
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {

    return (
      <GameCardLinkContainer>
        <Link to={this.props.redirectTo}>
          <GamePicBlurred>
            <canvas ref="canvas" width={"100%"} height={"100%"}/>
            <p>{this.props.remainingGuesses}</p>
          </GamePicBlurred>
          <GameInfo answere={this.state.newQuestionRecieved}>
            <div className="statusAndOpponent">
              {this.state.newQuestionRecieved ? <h3>Din tur!</h3> : <h3>Väntar på fråga...</h3>}
              <div className="opponent">
                {this.props.owner && <div className="imageHere" style={{backgroundImage: this.props.owner && `url(${this.props.ownerImage})`}}> </div> }
                {this.props.guesser && <div className="imageHere" style={{backgroundImage: this.props.guesser ? `url(${this.props.opponentImage})` : `url("./images/profile-avatar.svg")`}}> </div> }
                {this.props.owner && <p>{this.props.owner}</p>}
                {this.props.guesser && <p>{this.props.guesser}</p>}
              </div>
            </div>
            <p className="timeSinceAction">
              30 min
            </p>
          </GameInfo>
        </Link>
      </GameCardLinkContainer>
    )
  }
}

export default GameCardOwner;
