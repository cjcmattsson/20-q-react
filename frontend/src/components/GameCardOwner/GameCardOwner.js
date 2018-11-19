import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import {
  GameCardLinkContainer,
  SecretPerson,
  GameInfo
 } from './style.js';
import { Link } from "@reach/router";

class GameCardOwner extends Component {

  state = {
    newQuestionRecieved: false,
  }

  _isMounted = true;

  componentDidMount() {
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

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {

    return (
      <GameCardLinkContainer>
        <Link to={this.props.redirectTo}>
          <SecretPerson style={{backgroundImage: `url(${this.props.image})`}}>
            <p>{this.props.remainingGuesses}</p>
          </SecretPerson>
          <GameInfo answere={this.state.newQuestionRecieved}>
            <div className="statusAndOpponent">
              {this.state.newQuestionRecieved ? <h3>Din tur att svara!</h3> : <h3>Väntar på fråga...</h3>}
              <div className="opponent">
                {this.props.owner && <div className="imageHere" style={{backgroundImage: this.props.owner && `url(${this.props.ownerImage})`}}> </div> }
                {this.props.guesser && <div className="imageHere" style={{backgroundImage: this.props.guesser ? `url(${this.props.opponentImage})` : `url("./bjornborgpixel.jpg")`}}> </div> }
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
