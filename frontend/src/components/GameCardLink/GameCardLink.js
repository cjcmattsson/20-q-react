import React, { Component } from 'react';
import { GameCardLinkContainer } from './style.js';
import { Link } from "@reach/router";

class GameCardLink extends Component {

  render() {

    return (
      <GameCardLinkContainer>
        <Link to={this.props.redirectTo}>
          <div className="gamePicBlurred">
            {this.props.remainingGuesses}
          </div>
          <div className="gameInfo">
            <h3>Väntar på...</h3>
            {this.props.owner && <p>{this.props.owner}</p>}
            {this.props.guesser && <p>{this.props.guesser}</p>}
          </div>
        </Link>
      </GameCardLinkContainer>
    )
  }
}

export default GameCardLink;
